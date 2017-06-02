<script>
export default {
  name: 'page',
  /**
   * Renders page wide settings outside of the app element
   * such as page title, fav icon
   */
  render() {
    // dynamically load favicon and page title from config
    // require favicon file if found or set it to the same file as the toolbar logo
    // Logo loading depends on the webpack require.context API
    // https://webpack.github.io/docs/context.html
    const headElem = document.querySelector('head');

    const favIconElem = document.createElement('link');
    favIconElem.setAttribute('rel', 'fav icon');
    favIconElem.setAttribute('href', this.$store.state.config.ui.favIcon);
    headElem.appendChild(favIconElem);

    const titleElem = document.createElement('title');
    titleElem.textContent = this.$store.state.config.ui.pageTitle;
    headElem.appendChild(titleElem);
  },
};
</script>
