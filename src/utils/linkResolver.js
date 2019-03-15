function linkResolver(doc) {
  if (!doc) {
    return '/';
  }

  if (doc.url) {
    return doc.url;
  }

  if (doc.type) {
    switch (doc.type) {
      case 'homepage':
      return '/';
      case 'about':
        return '/about';
      case 'article':
        return `/articles/${doc.uid}`;
      case 'product':
        return `/products/${doc.uid}`;
      case 'custom_page':
        return `/${doc.uid}`;
    }
  }

  if (doc.__typename) {
    switch (doc.__typename) {
      case 'Homepage':
      return '/';
      case 'About':
        return '/about';
      case 'Article':
        return `/articles/${doc._meta.uid}`;
      case 'Product':
      return `/products/${doc._meta.uid}`;
      case 'Custom_page':
        return `/${doc._meta.uid}`;

      default:
        if (doc._meta.uid) {
          return `/${doc._meta.uid}`;
        }

        return `/${doc.__typename}`;
    }
  }

  return '/';
}

module.exports = {
  linkResolver,
};
