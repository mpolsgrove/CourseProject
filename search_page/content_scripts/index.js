(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  let text = "";
  let sentences = "";

  function index() {
    text = document.body.innerText
    sentences = text.split(/[!?.]+(?=$|\s)/);
    
  }

  function calculate_term_score(doc, term, docs, avgdl) {
    let D = doc.split(" ").length;
    let fqd = doc.split(term);
    let b = 0.75;
    let k = 1.5;
    let N = docs.length;
    let nq = 0;
    for( doc in docs)
    {
      if (docs[doc].includes(term)){
        nq += 1;
      }
    }
    let IDF = Math.log((N - nq + 0.5)/ (nq + 0.5) + 1)
    let score = IDF * ((fqd *(k+1)) / fqd + k * (1 -b + b * (D/avgdl)));
    return score;
  }

  function calculate_doc_score(doc, query, docs, avgdl){
    let score = 0;
    for (term in query)
    {
      score += calculate_term_score(doc, query[term], docs, avgdl)
    }
    return score;
  }

  function get_relevant_docs(query, docs){
    let avgdl = 0; 
    for (doc in docs){
      avgdl += docs[doc].split(" ").length;
    }
    avgdl = avgdl/docs.length;
    let scores = new Array();
    for (doc in docs){
      scores.push(calculate_doc_score(docs[doc], query, docs, avgdl))
    }
    let sorted_scores = scores;
    sorted_scores = sorted_scores.sort();
    let relevantDocs = new Array();
    if (docs.length > 5)
    {
      for(let i = 0; i < 5; i ++){
        let index = scores.indexOf(sorted_scores[i]);
        relevantDocs.push(docs[index]);
      }
    }
    else{
      relevantDocs = docs;
    }
    return relevantDocs;
  }

 function indexedSearch(query) {
    var reg = new RegExp(query, "g")
    index();
   //document.body.innerHTML = document.body.innerHTML.replace(reg, "<span class='my_search_result' style='background-color:#FFFF00'>" + query + "</span>")
    for(sentence in sentences){
      let relevantDocs = get_relevant_docs(query, sentences);
      if (relevantDocs.includes(sentences[sentence])){
        var reg = new RegExp(sentences[sentence])
        //document.body.innerHTML = document.body.innerHTML.replace(reg, "<span class='my_search_result' style='background-color:#FFFF00'>" + sentences[sentence] + "</span>")
        document.body.innerHTML = document.body.innerHTML.replace(reg, "<span class='my_search_result' style='background-color:#FFFF00'>" + sentences[sentence]+ "</span>")
      }
    }
 }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "search") {
      indexedSearch(message.query);
    } else {
      let a = 1;
    }
  })

})();
