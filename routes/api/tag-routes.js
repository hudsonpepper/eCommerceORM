const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    res.status(200)
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    })
    if (!tagData) {
      res.status(404).json({ message: "No tags exist" })
    }
    else { res.status(200).json(tagData) }
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    res.status(200)
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!tagData) {
      res.status(404).json({ message: "No tags exist" })
    }
    else { res.status(200).json(tagData) }
  }
  catch (err) {
    res.status(500).json(err)
  }

});

router.post('/', async (req, res) => {
  try {
    if (req.body.tag_name == null) {
      res.status(400).json({ message: "You need to include a tag_name in your body" })
    }
    else {
      const tagData = await Tag.create({tag_name: req.body.tag_name})
      if(!tagData) {
        res.status(500).json({message: "Error making tag"})
      }
      console.log(tagData.id)
      if(Array.isArray(req.body.products) && req.body.products.length > 0){
        const body = req.body.products.map((productId) => {
          return {
            tag_id: tagData.id,
            product_id: productId
          }
        })
        const response = await ProductTag.bulkCreate(body)
        if (!response) {
          res.status(500).json({message: "Error making associated products"})
        }
      }
      res.status(200).json(tagData)
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  // example body: 
  //  {
  //    "tag_name": "sports",
  //    "products": [2,4,5]
  //  }
  try {
    if (req.body.tag_name != null || Array.isArray(req.body.products)) {
      let nameResponse, productResponse;
      if (req.body.tag_name != null) {
        // isolate tag_name to prevent
        // manual setting of id or other body data
        const body = { tag_name: req.body.tag_name }
        nameResponse = await Tag.update(body, {
          where: { id: req.params.id }
        });
        if (!nameResponse) {
          res.status(500).json({ message: "No server response from tag_name" })
        }
      }
      if (Array.isArray(req.body.products)) {
        const existingProducts = await ProductTag.findAll({
          where: { tag_id: req.params.id }
        });
        const existingProductsIdArr = existingProducts.map(({ product_id }) => product_id)
        console.log("HERE: ", existingProductsIdArr)
        
        const newProducts = req.body.products
          .filter((product_id) => !existingProductsIdArr.includes(product_id))
          .map((product_id) => {
            return {
              product_id,
              tag_id: Number(req.params.id)
            }
          })
        const productTagsToRemove = existingProducts
          .filter(({ product_id }) => !req.body.products.includes(product_id))
          .map(({ id }) => id);

        productResponse = await Promise.all([
          ProductTag.destroy({
            where: {
              id: productTagsToRemove
            }
          }),
          ProductTag.bulkCreate(newProducts)
        ])
        console.log(productResponse)
        if (!productResponse) {
          res.status(500).json({ message: "No server response from products array updates" })
        }
      }
      if(nameResponse || productResponse){
        res.status(200).json({ message: "Success!" })
      }
    }
    else {
      res.status(400).json({ message: "You need to include a 'tag_name' or a 'products' id array in your body" })
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const response = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!response) {
      res.status(404).json({ message: 'No tag found with this id!' });
    }
    else {
      res.status(200).json({ message: 'Success!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
