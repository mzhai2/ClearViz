/**
 * Copyright 2015, Emory University
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package edu.emory.clir.clearnlp.clearviz;
import static spark.Spark.post;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	final TLanguage language = TLanguage.ENGLISH;
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
	}
	
	// public void namedEntityRecognition(InputStream in, PrintStream out)
	// {
	// 	DEPTree tree;
	// 	for (List<String> tokens : tokenizer.segmentize(in))
	// 	{
	// 		tree = new DEPTree(tokens);
	// 		ner.processDictionary(tree, dictionary);
	// 		out.println(tree.toString()+"\n");
	// 	}
	// }
	
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
		SparkApi clear = new SparkApi(TLanguage.ENGLISH);
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
        	try
			{
//	        	Map<String, List<String>> tags = ParseHtml.parseNER(inputString, new HashMap<String, List<String>>());
	        	baos = new ByteArrayOutputStream();
				ps = new PrintStream(baos);
				is = new ByteArrayInputStream(inputString.getBytes(StandardCharsets.UTF_8));
//				TSVReader t = new TSVReader(iID, iForm, iLemma, iPOSTag, iNamedEntityTag, iFeats, iHeadID, iDeprel, iXHeads, iSHeads)
			}
			catch (Exception e) {e.printStackTrace();}
			return baos.toString("UTF-8");
	    });
	}
}