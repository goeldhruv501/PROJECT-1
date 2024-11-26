const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema(
    {
        ShopKepperId: {
            type: String,
            required: [true, "Please provide the ShopKepperId"],
            trim: true,
        },

        title: {
            type: String,
            required: [true, "Please provide the title"],
            unique: true,
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Please provide the description"],
            trim: true,
        },

        gender: {
            type: String,
            require: [true, "Please Choose gender"]
        },

        category: {
            type: String,
            required: [true, "Please provide the category"]
        },

        price: {
            type: Number,
            required: [true, "Please provide the price"],
            trim: true,
        },

        // currencyId: {
        //   type: String,
        //   required: [true, "Please provide the currencyId"],
        //   enum: {
        //     values: ["INR", "USD"],
        //     message: "Please enter correct currencyId",
        //   },
        //   trim: true,
        // },
        // currencyFormat: {
        //   type: String,
        //   required: [true, "Please provide the currencyFormat"],
        //   trim: true,
        //   enum: ["₹", "$"],
        //   message: "Please enter correct currencyFormat",
        // },

        quantiy: {
            type: String,
            required: [true, "Please provide the Quantity"],
            trim: true,
        },

        isFreeShipping: {
            type: Boolean,
            default: false,
            trim: true,
        },

        productImage: {
            type: String,
            required: [true, "Please provide the productImage"],
            trim: true,
        },

        style: String,
        availableSizes: {
            type: [String],
            required: [true, "Please provide the availableSizes"],
            enum: {
                values: ["S", "XS", "M", "X", "L", "XXL", "XL"],
                message: "Please enter valid Size",
            },
        },
        installments: Number,
        deletedAt: {
            type: Date,
            default: null,
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductsSchema);