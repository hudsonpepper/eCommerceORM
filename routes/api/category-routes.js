const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    if (!categoryData) {
      res.status(404).json({ message: "No category exists with that id" })
    }
    else { res.status(200).json(categoryData) }
  }
  catch (err) {
    res.status(500).json(err)
  }

});

router.get('/:id', async (req, res) => {

  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!categoryData) {
      res.status(404).json({ message: "No category exists with that id" })
    }
    else {
      res.status(200).json(categoryData)
    }
  }
  catch (err) {
    res.status(500).json(err.message)
  }
});

router.post('/', async (req, res) => {
  try {
    if (req.body.category_name != null) {
      // isolate category_name to prevent
      // manual setting of id or other body data
      body = { category_name: req.body.category_name }
      const response = await Category.create(body);
      if (!response) {
        res.status(500).json({ message: "No server response" })
      }
      else {
        res.status(200).json({ message: "Success!" })
      }
    }
    else {
      res.status(400).json({ message: "You need to include a category_name in your body" })
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    if (req.body.category_name != null) {
      // isolate category_name to prevent
      // manual setting of id or other body data
      body = { category_name: req.body.category_name }
      const response = await Category.update(body, {
        where: { id: req.params.id }
      });
      
      if (!response) {
        res.status(500).json({ message: "No server response" })
      }
      else {
        res.status(200).json({ message: "Success!" })
      }
    }
    else {
      res.status(400).json({ message: "You need to include a category_name in your body" })
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const response = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!response) {
      res.status(404).json({ message: 'No category found with this id!' });
    }
    else {
      res.status(200).json({ message: 'Success!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
