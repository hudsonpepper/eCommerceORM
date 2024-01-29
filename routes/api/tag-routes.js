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
    res.status(200)
    if (req.body.tag_name == null) {
      res.status(400).json({ message: "You need to include a tag_name in your body" })
    }
    else {
      const tagData = await Tag.create()
      if (!tagData) {
        res.status(404).json({ message: "No tags exist" })
      }
      else { res.status(200).json(tagData) }
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
      let response, response2;
      if (req.body.tag_name != null) {
        // isolate tag_name to prevent
        // manual setting of id or other body data
        const body = { tag_name: req.body.tag_name }
        response = await Tag.update(body, {
          where: { id: req.params.id }
        });
        if (!response) {
          res.status(500).json({ message: "No server response from tag_name" })
        }
      }
      if (Array.isArray(req.body.products)) {
        console.log("length", req.body.products.length);
        const body = req.body.products.map((x) => {
          return {
            product_id: x,
            tag_id: Number(req.params.id)
          }
        })
        const response3 = await ProductTag.destroy({
          where: {
            tag_id: Number(req.params.id)
          }
        })
        console.log(response3)
        response2 = await ProductTag.bulkCreate(body);
        if (!response2) {
          res.status(500).json({ message: "No server response from products array" })
        }
      }
      res.status(200).json({ message: "Success!" })
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
