document.addEventListener('alpine:init', () => {
  Alpine.data('feedData', () => ({
    categoryFilter: [],
    results: [],
    itemsPerPage: 9,
    currentPage: 1,

    async init() {
      this.results = await this.loadData();
    },

    async loadData() {
      let data;
      // Replace with the appropriate URL for your CSV file
      const csvUrl = '../../feed/feed.csv';

      try {
        const response = await fetch(csvUrl);
        const text = await response.text();
        const results = Papa.parse(text, { header: true, dynamicTyping: true });
        data = results.data;
      } catch (error) {
        console.error('Error loading data:', error);
      }

      return data || [];
    },

    setCurrentPage(page) {
      this.currentPage = page;
    },

    get totalPages() {
      const filtered = this.results.filter((item) => {
        return this.categoryFilter.length === 0 || this.categoryFilter.includes(item['Application category']);
      });
      return Math.ceil(filtered.length / this.itemsPerPage);
    },

    get filteredResults() {
      const filtered = this.results.filter((item) => {
        return this.categoryFilter.length === 0 || this.categoryFilter.includes(item['Application category']);
      });

      // Calculate the start and end indices for the current page
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      // Slice the filtered results to display the current page
      return filtered.slice(startIndex, endIndex);
    },

    openModal(item) {
      // You can use JavaScript to open the modal here
      MicroModal.show('modal-1');
      
      // You can also set the modal content based on the selected item if needed
      // For example:
      document.getElementById('modal__project-name').innerText = item['Project name'];
      document.getElementById('modal__project-category').innerText = item['Application category'];
      document.getElementById('modal__project-agency').innerHTML = `<span>Agency:</span> ${item['Agency']}`;
      if(item['Website link'] !== "No") {
        document.getElementById('modal__project-website-link').innerHTML = `<span>Webiste Link:</span> <a href="${item['Website link']}">${item['Website link']}</a>`;
      }
      document.getElementById('modal__support-media-1').src = `./imgs/${item['Supporting media 1']}`;
      document.getElementById('modal__support-media-2').src = `./imgs/${item['Supporting media 2']}`;
      document.getElementById('modal__support-media-3').src = `./imgs/${item['Supporting media 3']}`;
    }
  }));
});
