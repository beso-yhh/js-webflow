(() => {
  // src/cms/populate-external-data/index.ts
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsload",
    async (listInstances) => {
      const [listInstance] = listInstances;
      const [firstItem] = listInstance.items;
      const itemTemplateElement = firstItem.element;
      const products = await fetchProducts();
      listInstance.clearItems();
      const newItems = products.map((product) => createItem(product, itemTemplateElement));
      await listInstance.addItems(newItems);
    }
  ]);
  var fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    } catch (error) {
      return [];
    }
  };
  var createItem = (product, templateElement) => {
    const newItem = templateElement.cloneNode(true);
    const title = newItem.querySelector('[data-element="title"]');
    const category = newItem.querySelector('[data-element="category"]');
    const description = newItem.querySelector('[data-element="description"]');
    if (title)
      title.textContent = product.title;
    if (category)
      category.textContent = product.category;
    if (description)
      description.textContent = product.description;
    return newItem;
  };
})();
