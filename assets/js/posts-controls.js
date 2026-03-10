(function () {
  var postsContainer = document.getElementById("posts");
  var searchInput = document.getElementById("post-search");
  var yearFilter = document.getElementById("post-year-filter");
  var monthFilter = document.getElementById("post-month-filter");
  var sortOrder = document.getElementById("post-sort-order");
  var emptyState = document.getElementById("posts-empty-state");

  if (!postsContainer || !searchInput || !yearFilter || !monthFilter || !sortOrder) {
    return;
  }

  var cards = Array.prototype.slice.call(postsContainer.querySelectorAll(".post-card"));

  function normalize(text) {
    return String(text || "").toLowerCase();
  }

  function matchesSearch(card, query) {
    if (!query) {
      return true;
    }

    var haystack = normalize(card.dataset.title) + " " + normalize(card.dataset.excerpt);
    return haystack.indexOf(query) !== -1;
  }

  function matchesYear(card, selectedYear) {
    return selectedYear === "all" || card.dataset.year === selectedYear;
  }

  function matchesMonth(card, selectedMonth) {
    return selectedMonth === "all" || card.dataset.month === selectedMonth;
  }

  function sortCards(visibleCards, order) {
    visibleCards.sort(function (a, b) {
      var aDate = Number(a.dataset.date || 0);
      var bDate = Number(b.dataset.date || 0);
      return order === "oldest" ? aDate - bDate : bDate - aDate;
    });

    visibleCards.forEach(function (card) {
      postsContainer.appendChild(card);
    });
  }

  function applyFilters() {
    var query = normalize(searchInput.value).trim();
    var selectedYear = yearFilter.value;
    var selectedMonth = monthFilter.value;
    var order = sortOrder.value;
    var visibleCards = [];

    cards.forEach(function (card) {
      var isMatch =
        matchesSearch(card, query) &&
        matchesYear(card, selectedYear) &&
        matchesMonth(card, selectedMonth);

      card.classList.toggle("is-hidden", !isMatch);

      if (isMatch) {
        visibleCards.push(card);
      }
    });

    sortCards(visibleCards, order);

    if (emptyState) {
      emptyState.hidden = visibleCards.length > 0;
    }
  }

  searchInput.addEventListener("input", applyFilters);
  yearFilter.addEventListener("change", applyFilters);
  monthFilter.addEventListener("change", applyFilters);
  sortOrder.addEventListener("change", applyFilters);

  applyFilters();
})();
