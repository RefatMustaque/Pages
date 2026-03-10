(function () {
  var navDropdown = document.querySelector(".nav-dropdown");
  var navDropdownToggle = navDropdown ? navDropdown.querySelector(".nav-dropdown-toggle") : null;

  if (navDropdown && navDropdownToggle) {
    navDropdownToggle.addEventListener("click", function () {
      var isOpen = navDropdown.classList.toggle("is-open");
      navDropdownToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (event) {
      if (!navDropdown.contains(event.target)) {
        navDropdown.classList.remove("is-open");
        navDropdownToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var postsContainer = document.getElementById("posts");
  var searchInput = document.getElementById("post-search");
  var yearFilter = document.getElementById("post-year-filter");
  var monthFilter = document.getElementById("post-month-filter");
  var sortOrder = document.getElementById("post-sort-order");
  var emptyState = document.getElementById("posts-empty-state");
  var categoryChipsContainer = document.getElementById("category-chips");
  var selectedCategory = "all";

  var cards = postsContainer
    ? Array.prototype.slice.call(postsContainer.querySelectorAll(".post-card"))
    : [];

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

  function matchesCategory(card, category) {
    if (!category || category === "all") {
      return true;
    }

    return normalize(card.dataset.taxonomy).indexOf(category) !== -1;
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
    if (!postsContainer || !searchInput || !yearFilter || !monthFilter || !sortOrder) {
      return;
    }

    var query = normalize(searchInput.value).trim();
    var selectedYear = yearFilter.value;
    var selectedMonth = monthFilter.value;
    var order = sortOrder.value;
    var visibleCards = [];

    cards.forEach(function (card) {
      var isMatch =
        matchesSearch(card, query) &&
        matchesYear(card, selectedYear) &&
        matchesMonth(card, selectedMonth) &&
        matchesCategory(card, selectedCategory);

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

  if (postsContainer && searchInput && yearFilter && monthFilter && sortOrder) {
    searchInput.addEventListener("input", applyFilters);
    yearFilter.addEventListener("change", applyFilters);
    monthFilter.addEventListener("change", applyFilters);
    sortOrder.addEventListener("change", applyFilters);
  }

  if (categoryChipsContainer) {
    categoryChipsContainer.addEventListener("click", function (event) {
      var chip = event.target.closest(".category-chip");
      if (!chip) {
        return;
      }

      selectedCategory = String(chip.dataset.filter || "all").toLowerCase();

      Array.prototype.forEach.call(categoryChipsContainer.querySelectorAll(".category-chip"), function (btn) {
        btn.classList.toggle("is-active", btn === chip);
      });

      applyFilters();
    });
  }

  applyFilters();

  var postContent = document.getElementById("post-content");
  var tocList = document.getElementById("post-toc-list");
  var progressBar = document.getElementById("reading-progress-bar");

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function updateReadingProgress() {
    if (!postContent || !progressBar) {
      return;
    }

    var contentTop = postContent.offsetTop;
    var contentHeight = postContent.offsetHeight;
    var viewportHeight = window.innerHeight;
    var scrollY = window.scrollY;
    var distance = Math.max(contentHeight - viewportHeight, 1);
    var rawProgress = (scrollY - contentTop) / distance;
    var progress = Math.min(1, Math.max(0, rawProgress));

    progressBar.style.width = String(progress * 100) + "%";
  }

  if (postContent && tocList) {
    var headings = Array.prototype.slice.call(postContent.querySelectorAll("h2, h3"));
    var headingMap = [];

    headings.forEach(function (heading, index) {
      if (!heading.id) {
        var baseId = slugify(heading.textContent);
        heading.id = baseId ? baseId + "-" + String(index + 1) : "section-" + String(index + 1);
      }

      var listItem = document.createElement("li");
      var link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent;

      if (heading.tagName === "H3") {
        link.style.paddingLeft = "0.65rem";
      }

      listItem.appendChild(link);
      tocList.appendChild(listItem);
      headingMap.push({ heading: heading, link: link });
    });

    if (headingMap.length === 0) {
      var tocContainer = document.getElementById("post-toc");
      if (tocContainer) {
        tocContainer.innerHTML = "<p>No sections in this article yet.</p>";
      }
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var match = headingMap.find(function (item) {
              return item.heading === entry.target;
            });

            if (!match) {
              return;
            }

            if (entry.isIntersecting) {
              headingMap.forEach(function (item) {
                item.link.classList.remove("is-active");
              });
              match.link.classList.add("is-active");
            }
          });
        },
        {
          rootMargin: "-28% 0px -60% 0px",
          threshold: 0.1,
        }
      );

      headingMap.forEach(function (item) {
        observer.observe(item.heading);
      });
    }
  }

  if (progressBar) {
    window.addEventListener("scroll", updateReadingProgress, { passive: true });
    window.addEventListener("resize", updateReadingProgress);
    updateReadingProgress();
  }
})();
