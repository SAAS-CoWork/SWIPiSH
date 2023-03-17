const _ = require('lodash');
const util = require('../../util/util');
const Product = require('../models/product_model');
const { PAGE_SIZE } = require('../constants/product');

const createProduct = async (req, res) => {
  const body = req.body;
  const product = {
    // id: body.product_id,
    category: body.category,
    title: body.title,
    description: body.description,
    price: body.price,
    texture: body.texture,
    wash: body.wash,
    place: body.place,
    note: body.note,
    story: body.story,
  };
  product.main_image = 'products/' + req.files.main_image[0].filename;
  const colorIds = body.color_ids.split(',');
  const sizes = body.sizes.split(',');

  const variants = sizes.flatMap((size) => {
    return colorIds.map((color_id) => {
      return [color_id, size, Math.round(Math.random() * 10)];
    });
  });
  const images = req.files.other_images.map((img) => ['products/' + img.filename]);

  const productId = await Product.createProduct(product, variants, images);
  if (productId == -1) {
    res.status(500);
  } else {
    res.status(200).send({ productId });
  }
};

const getProducts = async (req, res) => {
  const paging = req.query.paging === undefined ? 0 : Number(req.query.paging);
  if (!Number.isInteger(paging) || paging < 0) {
    return res.status(400).send({ error: 'Invalid Paging Number' });
  }

  const category = req.params.category;
  const requirement = category === 'all' ? {} : { category };
  const { products, productCount } = await Product.getProducts(PAGE_SIZE, paging, requirement);

  if (products.length == 0) {
    return res.status(200).json({ data: [] });
  }

  let productsWithDetail = await getProductsWithDetail(req.protocol, req.hostname, products);

  let result = { data: productsWithDetail };
  if (productCount > (paging + 1) * PAGE_SIZE) {
    result.next_paging = paging + 1;
  }

  res.status(200).json(result);
};
const searchProducts = async (req, res) => {
  const paging = req.query.paging === undefined ? 0 : Number(req.query.paging);
  if (!Number.isInteger(paging) || paging < 0) {
    return res.status(400).json({ error: 'Invalid Paging Number' });
  }

  if (!req.query.keyword) {
    return res.status(400).json({ error: 'Invalid Keyword' });
  }

  const { products, productCount } = await Product.getProducts(PAGE_SIZE, paging, {
    keyword: req.query.keyword,
  });

  if (products.length == 0) {
    return res.status(200).json({ data: [] });
  }

  let productsWithDetail = await getProductsWithDetail(req.protocol, req.hostname, products);

  let result = { data: productsWithDetail };
  if (productCount > (paging + 1) * PAGE_SIZE) {
    result.next_paging = paging + 1;
  }

  res.status(200).json(result);
};

const getProduct = async (req, res) => {
  const id = req.query.id === undefined ? 0 : Number(req.query.id);
  if (!Number.isInteger(id) || id < 0) {
    return res.status(400).json({ error: 'Wrong Request' });
  }

  const { products } = await Product.getProducts(PAGE_SIZE, 0, { id });

  if (products.length == 0) {
    return res.status(200).json({ data: null });
  }

  let productsWithDetail = await getProductsWithDetail(req.protocol, req.hostname, products);

  res.status(200).json({ data: productsWithDetail[0] });
};

const getProductsWithDetail = async (protocol, hostname, products) => {
  const productIds = products.map((p) => p.id);
  const variants = await Product.getProductsVariants(productIds);
  const variantsMap = _.groupBy(variants, (v) => v.product_id);
  const images = await Product.getProductsImages(productIds);
  const imagesMap = _.groupBy(images, (v) => v.product_id);

  return products.map((p) => {
    const assetsPath = util.getAssetsPath(protocol, hostname);
    p.main_image = p.main_image ? assetsPath + p.main_image : null;
    p.images = p.images ? p.images.split(',').map((img) => assetsPath + img) : null;

    const productVariants = variantsMap[p.id];
    if (!productVariants) {
      return p;
    }

    p.variants = productVariants.map((v) => ({
      color_code: v.code,
      size: v.size,
      stock: v.stock,
    }));

    const allColors = productVariants.map((v) => ({
      code: v.code,
      name: v.name,
    }));
    p.colors = _.uniqBy(allColors, (c) => c.code);

    const allSizes = productVariants.map((v) => v.size);
    p.sizes = _.uniq(allSizes);
    p.images = imagesMap[p.id].map((img) => assetsPath + img.image);
    return p;
  });
};

module.exports = {
  createProduct,
  getProductsWithDetail,
  getProducts,
  searchProducts,
  getProduct,
};
