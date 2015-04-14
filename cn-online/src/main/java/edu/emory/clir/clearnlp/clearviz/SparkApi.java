package edu.emory.clir.clearnlp.clearviz;
import static spark.Spark.post;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;
import edu.emory.clir.clearnlp.collection.tree.PrefixTree;
import edu.emory.clir.clearnlp.component.AbstractComponent;
import edu.emory.clir.clearnlp.component.mode.dep.DEPConfiguration;
import edu.emory.clir.clearnlp.component.mode.ner.AbstractNERecognizer;
import edu.emory.clir.clearnlp.component.mode.ner.EnglishNERecognizer;
import edu.emory.clir.clearnlp.component.utils.NLPUtils;
import edu.emory.clir.clearnlp.dependency.DEPNode;
import edu.emory.clir.clearnlp.dependency.DEPTree;
import edu.emory.clir.clearnlp.ner.NERInfoList;
import edu.emory.clir.clearnlp.reader.TSVReader;
import edu.emory.clir.clearnlp.tokenization.AbstractTokenizer;
import edu.emory.clir.clearnlp.util.lang.TLanguage;

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
	private static AbstractNERecognizer ner;
	private static PrefixTree<String,NERInfoList> dictionary;
	private static TSVReader reader;

	
	public SparkApi(TLanguage language) throws Exception
	{
		final String rootLabel = "root";	// root label for dependency parsing
		morph = NLPUtils.getMPAnalyzer(language);
		tagger = NLPUtils.getPOSTagger(language, "general-en-pos.xz");
		parser = NLPUtils.getDEPParser(language, "general-en-dep.xz", new DEPConfiguration(rootLabel));
		ner = new EnglishNERecognizer();
		dictionary = NLPUtils.getNEDictionary(language, "general-en-ner-dict.xz");
		components = new AbstractComponent[]{tagger, morph, parser};
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

			ner.processDictionary(tree, dictionary);
			out.println(tree.toString(DEPNode::toStringNER)+"\n");
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
				while ((tree=reader.next())!= null) {
					ner.learnDictionary(tree, dictionary);
				}
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