package edu.emory.clir.clearnlp.clearviz;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import edu.emory.clir.clearnlp.collection.tree.PrefixTree;
import edu.emory.clir.clearnlp.component.AbstractComponent;
import edu.emory.clir.clearnlp.component.mode.dep.DEPConfiguration;
import edu.emory.clir.clearnlp.component.mode.ner.AbstractNERecognizer;
import edu.emory.clir.clearnlp.component.mode.ner.DefaultNERecognizer;
import edu.emory.clir.clearnlp.component.mode.ner.EnglishNERecognizer;
import edu.emory.clir.clearnlp.component.utils.GlobalLexica;
import edu.emory.clir.clearnlp.component.utils.NLPUtils;
import edu.emory.clir.clearnlp.dependency.DEPNode;
import edu.emory.clir.clearnlp.dependency.DEPTree;
import edu.emory.clir.clearnlp.ner.NERInfoList;
import edu.emory.clir.clearnlp.reader.TSVReader;
import edu.emory.clir.clearnlp.tokenization.AbstractTokenizer;
import edu.emory.clir.clearnlp.util.lang.TLanguage;
import static spark.Spark.post;
public class SparkApi
{
	final static TLanguage language = TLanguage.CHINESE;
	private static ByteArrayOutputStream baos;
	private static PrintStream ps;
	private static InputStream is;
	private static AbstractComponent morph;
	private static AbstractComponent[] components;
	private static AbstractTokenizer tokenizer;
	private static AbstractComponent parser;
	private static AbstractComponent tagger;
	private static TSVReader reader;
	private static AbstractComponent ner;

	
	public SparkApi(TLanguage language) throws Exception
	{
		List<String> dsw = new ArrayList<>();
		dsw.add("brown-rcv1.clean.tokenized-CoNLL03.txt-c1000-freq1.txt.xz");
		dsw.add("model-2030000000.LEARNING_RATE=1e-09.EMBEDDING_LEARNING_RATE=1e-06.EMBEDDING_SIZE=100.txt.xz");
		dsw.add("hlbl_reps_clean_2.50d.rcv1.clean.tokenized-CoNLL03.case-intact.txt.xz");
		GlobalLexica.initDistributionalSemanticsWords(dsw);

		final String rootLabel = "root";	// root label for dependency parsing
		morph = NLPUtils.getMPAnalyzer(language);
		tagger = NLPUtils.getPOSTagger(language, "general-en-pos.xz");
		parser = NLPUtils.getDEPParser(language, "general-en-dep.xz", new DEPConfiguration(rootLabel));	
		ner = new DefaultNERecognizer(NLPUtils.getObjectInputStream("general-en-ner.xz"));
		components = new AbstractComponent[]{tagger, morph, parser, ner};
		
		tokenizer  = NLPUtils.getTokenizer(language);
		reader = new TSVReader(0, 1, 2, 3, 7, 4, 5, 6, -1, -1);
	}
	
	public void processRaw(InputStream in, PrintStream out) throws Exception
	{
		DEPTree tree;
		for (List<String> tokens : tokenizer.segmentize(in))
		{
			tree = new DEPTree(tokens);

			for (AbstractComponent component : components)
				component.process(tree);
			out.println(tree.toString()+"\n");

		}
		in.close();
		out.close();
	}
	
	class NLPTask implements Runnable
	{
		InputStream in;
		PrintStream out;
		
		public NLPTask(InputStream in, PrintStream out)
		{
			this.in  = in;
			this.out = out;
		}
		
		@Override
		public void run()
		{
			try
			{
				processRaw(in, out);
			}
			catch (Exception e) {e.printStackTrace();}
		}
	}
	
	public DEPTree toDEPTree(String line)
	{
		List<String> tokens = tokenizer.tokenize(line);
		DEPTree tree = new DEPTree(tokens);
		
		for (AbstractComponent component : components)
			component.process(tree);
		
		return tree;
	}

	public static void main(String[] args) throws Exception
	{
		SparkApi clear = new SparkApi(language);
		System.out.println("Ready");
        post("/deptree", (req, res) -> {
        	String inputString = req.body();
        	try
			{
				baos = new ByteArrayOutputStream();
				ps = new PrintStream(baos);
				is = new ByteArrayInputStream(inputString.getBytes(StandardCharsets.UTF_8));
				clear.processRaw(is, ps);
			}
			catch (Exception e) {e.printStackTrace();}
			return baos.toString("UTF-8");
        });
        post("/annotatener", (req, res) -> {
        	String inputString = req.body();
        	System.out.println(inputString);
        	try
			{
	        	baos = new ByteArrayOutputStream();
				ps = new PrintStream(baos);
				is = new ByteArrayInputStream(inputString.getBytes(StandardCharsets.UTF_8));
				reader.open(new ByteArrayInputStream(inputString.getBytes()));
				DEPTree tree;
				List<DEPTree> trees = new ArrayList<>();
				while ((tree=reader.next())!= null) {
					trees.add(tree);
				}
				((AbstractNERecognizer)ner).onlineTrain(trees);
				try(PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("ner.txt", true)))) {
        			out.print(inputString);
        		} catch (IOException e) {
        			System.out.println("error");
        		}
			}
			catch (Exception e) {e.printStackTrace();}
			return baos.toString("UTF-8");
	    });
	}
}