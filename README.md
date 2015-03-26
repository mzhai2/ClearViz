# ClearViz
Background: Demonstrate ClearNLP's features and performance to potential users through an easy to use interface and increase market size.

Currently difficult to setup ClearNLP and test performance and scaling to cloud.

Similar products:
http://www.conversational-technologies.com/nldemos/nlDemos.html

Market Need:
Any college researching NLP, any company using NLP for commercial applications.
Potential, become top NLP suite in the commercial and academic field.
Apple, Google, Infosys

Competitors:
Stanford CoreNLP
Illinois NLP suite
AlchemyAPI NLP

Product idea:
Demonstrate:
    Dependency parsing
    Tokenization and segmentation
    Part-of-speech tagging
    Morphological analysis
    Semantic role labeling
    ClearCloud: Run ClearNLP on EC2 and sell as a service

Tools (indicate interest with name, we can have more than person working on a thing):
MEAN.js
QUnit Unit testing
Yeoman scaffolding
ClearNLP (Mike)
jQuery (Mike)
Twitter Bootstrap
BRAT rapid annotation tool http://brat.nlplab.org to visualize annotations (Mike)
vis.js http://visjs.org to visualize metadata

Use cases:
Linguistics

Tutorial Followed:
https://www.youtube.com/watch?v=AEE7DY2AYvI

Online Presentation:
https://docs.google.com/presentation/d/1MypSuPZunaaxAwMscj3LS1YqIIETY3oNhz8wynE3GCs/edit?usp=sharing

http://requestmaker.com
52.1.147.106:4567/deptree
http://mathcs.emory.edu/~choi/clearnlp/demo/demo.html

*Progress was originally tracked on PivotalTracker; however, due to the expiration of a trial version, progress is transferred and now being tracked on Trello.

### Test instruction:
1. Deployed at http://52.1.147.106:3000
2. Signin using an existing account or Signup for a new account.
3. List all trees to view all existing trees in database.
4. Click on title to view the tree visualization.
5. Create a new tree by entering title and each sentence separated by new line.
6. Remove tree in tree view.
7. Edit tree not yet implemented.
8. Return to menu using back.

### AngularJS Unit Testing
Unit test files directory path for trees model: `ClearNLP-demo-website/public/trees/tests/unit`
Directory path for users model: `ClearNLP-demo-website/public/users/tests/unit`

The files in the each directory test several components for each model in this application.

Running the unit tests require the use of Karma's command line utility.
First navigate to the application's root directory: `/ClearNLP-demo-website/`
Input the command:  `$ NODE_ENV=test karma start`
Those using Windows should first input the command:  `> set NODE_ENV=test`
Then input the command: `> karma start`

### Express Testing
Directory path: `ClearViz/app/tests`

Navigate to the application's root directory: `/ClearViz/`
Input the command: `$ NODE_ENV=test mocha --reporter spec app/tests`
If you are using Windows, first run: `> set NODE_ENV=test`
Next, input the command: `> mocha --reporter spec app/tests`









