package com.ClearViz.app;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.io.StringReader;
import java.text.BreakIterator;
import java.util.Locale;
import java.util.Scanner;

import com.clearnlp.component.AbstractComponent;
import com.clearnlp.dependency.DEPTree;
import com.clearnlp.nlp.NLPGetter;
import com.clearnlp.nlp.NLPMode;
import com.clearnlp.reader.AbstractReader;
import com.clearnlp.tokenization.AbstractTokenizer;

import static spark.Spark.*;

public class SparkApi
{
final String language = AbstractReader.LANG_EN;
private static ByteArrayOutputStream baos;
private static PrintStream ps;
private static StringReader sr;
private static BufferedReader br;
private static AbstractComponent[] components;
private static AbstractTokenizer tokenizer;
private static AbstractComponent parser;
private static AbstractComponent identifier;
private static AbstractComponent classifier;
private static AbstractComponent labeler;
private static AbstractComponent tagger;
	public SparkApi() throws Exception
	{
		tokenizer  = NLPGetter.getTokenizer(language);
		tagger     = NLPGetter.getComponent("general-en", language, NLPMode.MODE_POS);
		parser     = NLPGetter.getComponent("general-en", language, NLPMode.MODE_DEP);
		identifier = NLPGetter.getComponent("general-en", language, NLPMode.MODE_PRED);
		classifier = NLPGetter.getComponent("general-en", language, NLPMode.MODE_ROLE);
		labeler    = NLPGetter.getComponent("general-en", language, NLPMode.MODE_SRL);
	}
	
	public void process(AbstractTokenizer tokenizer, AbstractComponent[] components, String sentence, PrintStream fout)
	{
		DEPTree tree = NLPGetter.toDEPTree(tokenizer.getTokens(sentence));
		
		for (AbstractComponent component : components)
			component.process(tree);

		fout.println(tree.toStringSRL()+"\n");
	}
	
	public void processMulti(AbstractTokenizer tokenizer, AbstractComponent[] components, BufferedReader reader, PrintStream fout) throws Exception
	{
		String line;
		
		while ((line = reader.readLine()) != null) {
			BreakIterator iterator = BreakIterator.getSentenceInstance(Locale.US);
			iterator.setText(line);
			int start = iterator.first();
			for (int end = iterator.next();
			    end != BreakIterator.DONE;
			    start = end, end = iterator.next()) {
				process(tokenizer, components, line.substring(start,end), fout);
			}
		}
		reader.close();
		fout.close();
	}
	

	public static void main(String[] args) throws Exception
	{
		SparkApi clear = new SparkApi();
		System.out.println("Ready");
        post("/deptree", (req, res) -> {
        	String inputString = req.body();
        	try
			{
				baos = new ByteArrayOutputStream();
				ps = new PrintStream(baos);

				sr = new StringReader(inputString); // wrap your String
				br = new BufferedReader(sr); // wrap your StringReader
				components = new AbstractComponent[]{SparkApi.tagger, SparkApi.parser, SparkApi.identifier, SparkApi.classifier, SparkApi.labeler};

				clear.processMulti(SparkApi.tokenizer, components, br, ps);
			}
			catch (Exception e) {e.printStackTrace();}
			return baos.toString("UTF-8");
        	});
	}
}
