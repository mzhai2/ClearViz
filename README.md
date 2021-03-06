# ClearViz
Demonstrate ClearNLP's features and performance to potential users through an easy to use interface and increase market size.

* Similar products: http://www.conversational-technologies.com/nldemos/nlDemos.html
* Market Need: Any college researching NLP, any company using NLP for commercial applications. Potential, become top NLP suite in the commercial and academic field. Apple, Google, Infosys
* Competitors: Stanford CoreNLP, Illinois NLP suite, AlchemyAPI NLP
* Use cases: Linguistics
* Tutorial Followed: https://www.youtube.com/watch?v=AEE7DY2AYvI, MEAN Development by Israr Soomro (Book)

###Product idea
Demonstrate:
* Dependency parsing
* Tokenization and segmentation
* Part-of-speech tagging
* Morphological analysis
* Semantic role labeling
* ClearCloud: Run ClearNLP on EC2 and sell as a service

Tools (indicate interest with name, we can have more than person working on a thing):
MEAN.js (Andrew, Deh Jun)
QUnit Unit testing (Andrew, Deh Jun)
Yeoman scaffolding
ClearNLP (Mike)
jQuery (Mike)
Twitter Bootstrap
BRAT rapid annotation tool http://brat.nlplab.org to visualize annotations (Mike)
vis.js http://visjs.org to visualize metadata

**Progress was originally tracked on PivotalTracker; however, due to the expiration of a trial version, progress is transferred and now being tracked on Trello.

### Presentations:
* (02/26) https://drive.google.com/open?id=1MypSuPZunaaxAwMscj3LS1YqIIETY3oNhz8wynE3GCs&authuser=0
* (03/19) https://drive.google.com/open?id=1QJV0gwx8mF2OLMfk7UGWDD9yV086sGk5pImLfKNno54&authuser=0
* (04/02) https://drive.google.com/open?id=1s683_LtVla_PuuN0stuNRduo1oDPNkqeQ7efewzpO8Q&authuser=0
* (04/16) https://docs.google.com/presentation/d/1E4g8mYuep0cvgpH-BNF_sw4XbQV82anec14Sovdhkyc/edit?usp=sharing

### Test instruction:
1. Deployed at http://52.6.179.224:3000
2. Signin using an existing account or Signup for a new account.
3. List all trees to view all existing trees in database.
4. Click on title to view the tree visualization.
5. Create a new tree by entering title and each sentence separated by new line.
6. Remove tree in tree view.
7. Edit tree function will edit the tree and dependency diagram.
8. Return to menu using back.


### AngularJS Unit Testing
Unit test files directory path for trees model: `ClearViz/public/trees/tests/unit`
Directory path for users model: `ClearViz/public/users/tests/unit`

The files in the each directory test several components for each model in this application.

Running the unit tests require the use of Karma's command line utility:

1. Navigate to the application's root directory: `/ClearViz/`
2. Input the command:  `$ NODE_ENV=test karma start`
3. Those using Windows should first input the command:  `> set NODE_ENV=test`
4. Then input the command: `> karma start`

### AngularJS E2E Automated Testing
Directory path: `ClearViz/public/trees/e2e`:

1. Navigate to the application's root directory: `/ClearViz/`
2. Input the command: `$ NODE_ENV=test node server`
3. If you are using Windows, first run: `> set NODE_ENV=test`
4. Then, input the command: `node server`
5. Finally, start protractor: `$ protractor`

**Login method was changed from AngularJS to Express Passport. Therefore, `protractor` cannot test login. The test fails as one should not be able to create a tree without logging in. 

### Express Testing
Directory path: `ClearViz/app/tests`:

1. Navigate to the application's root directory: `/ClearViz/`
2. Input the command: `$ NODE_ENV=test mocha --reporter spec app/tests`
3. If you are using Windows, first run: `> set NODE_ENV=test`
4. Next, input the command: `> mocha --reporter spec app/tests`

###Travis CI

Continuous Integration is done using TravisCI and is run here: https://magnum.travis-ci.com/CS370-soft-eng-practicum/ClearViz

We are still working hard on it as it currently fails. 






