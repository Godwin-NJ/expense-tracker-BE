const express = require('express')
const router = express.Router()

const {
    getAllEntry,
    createEntry,
    updateEntry,
    deleteEntry
} = require('../controllers/userExpense')

router.route('/').post(createEntry).get(getAllEntry)
router.route('/:id').patch(updateEntry).delete(deleteEntry)

module.exports = router

