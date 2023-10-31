document.addEventListener("DOMContentLoaded", (event) => {
  var data;

  Papa.parse("../feed/feed.csv", {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function(results) {
      console.log(results);
      data = results.data;
    },
  });
});
