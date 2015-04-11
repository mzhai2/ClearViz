package edu.emory.clir.clearnlp.clearviz;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ParseHtml {
	public static Map<String, List<String>> parseNER(String html, Map<String, List<String>> tags) {
		Pattern orgPattern = Pattern.compile("<span class=\"Organization\">(\\S+)</span>");
		Pattern perPattern = Pattern.compile("<span class=\"Person\">(\\S+)</span>");
		Pattern locPattern = Pattern.compile("<span class=\"Location\">(\\S+)</span>");
		
		getTags("org", orgPattern.matcher(html), tags);
		getTags("per", perPattern.matcher(html), tags);
		getTags("loc", locPattern.matcher(html), tags);

		return tags;
	}
	
	private static void getTags(String s, Matcher m, Map<String, List<String>> tags) {
		while (m.find()) {
			String word = m.group(1);
			tags.computeIfAbsent(s, k->new ArrayList<String>()).add(word);
		}
		
		return;
	}
}
