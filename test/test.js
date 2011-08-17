var glossary = require("../glossary"),
    assert = require("assert");

var string = "Patsy Cline \
born in Gore, Virginia, was an American country music singer \
who enjoyed pop music crossover success during the era of the Nashville sound in the early 1960s. \
Since her death in 1963 at age 30 in a private airplane crash, \
she has been considered one of the most influential, successful, \
and acclaimed female singers.";

assert.deepEqual(glossary.extract(string),["Patsy","Cline","Patsy Cline","Gore","Virginia","American","country","music","singer","American country music singer","pop","crossover","success","pop music crossover success","era","Nashville","sound","Nashville sound","death","age","airplane","crash","airplane crash","one"])

assert.deepEqual(glossary({ minFreq: 2 }).extract(string), ["music","singer"]);

assert.deepEqual(glossary({ collapse: true }).extract(string), ["Patsy Cline","Gore","Virginia","American country music singer","pop music crossover success","era","Nashville sound","death","age","airplane crash","one"]);

assert.deepEqual(glossary({ blacklist: ["singer", "one", "gore", "sound"]}).extract(string), ["Patsy","Cline","Patsy Cline","Virginia","American","country","music","pop","crossover","success","pop music crossover success","era","Nashville","death","age","airplane","crash","airplane crash"])

assert.deepEqual(glossary({ minFreq: 2, verbose: true }).extract(string), [{"count":2,"norm":"music","word":"music"},{"count":2,"norm":"singer","word":"singer"}]);
