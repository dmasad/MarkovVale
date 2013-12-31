			var chain;
			


			/** 
			Get a random key from an object, with weights stored in value.
			*/
			var weightedRandom = function(obj) {
				var total = 0;
				for (var key in obj) 
					total += obj[key];
				var r = Math.random() * total;
				var counter = 0;
				for (var key in obj) {
					if (r < counter + obj[key])
						return key;
					counter += obj[key];
				}
			}

			var buildChain = function(n) {
				words = ["Welcome", "to", "Night", "Vale", "."];
				//start = randomKey(chain).split("|");
				//words.push(start[0]);
				//words.push(start[1]);
				for(var i=0; i < n; i++) {
					var lastTwo = words.slice(words.length-2);
					var current = lastTwo[0] + "|" + lastTwo[1];
					//next = randomKey(chain[current]);
					next = weightedRandom(chain[current]);
					words.push(next);
				}
				var text = "";
				var openQuote = false;

				var PUNCT = [",", ".", "!", "?", ":", ";"];
				for (var l in words) {
					nextWord = words[l];
					if (PUNCT.indexOf(nextWord) > -1)
						text += nextWord;
					else if (nextWord === '"') continue; // Skip quotations for now
					else
						text += " " + nextWord;	
				}

				//return text;
				$('#chain').html('<p>'+text+'</p>');
				console.log("here");
			}

window.onload=$.getJSON("Chain.json", function(data) {
	chain = data;
	buildChain(100);
	});

