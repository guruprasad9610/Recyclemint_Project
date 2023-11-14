import mongoose from "mongoose";
import Orders from "../model/order.model.js";
import Items from "../model/items.model.js";
import Orderitems from "../model/orderitem.model.js";
import Address from '../model/address.model.js';
import Customers from "../model/customer.model.js";
import Users from "../model/users.model.js";
const ObjectId = mongoose.Types.ObjectId;
import moment from 'moment';

// Order Id randomize
// const generateRandomOrderId = async () => {
//     let orderExists = true;
//     let order_id;

//     while (orderExists) {
//         const randomNumber = Math.floor(Math.random() * 1000000);
//         order_id = `ord_${randomNumber}`;

//         await Orders.findOne({ order_id }).then((x) => {
//             if (!x) {
//                 orderExists = false;
//             }
//         });

//     }

//     return order_id;
// };

async function generateRandomOrderId() {
    let newOrderID;
    const latestOrder = await Orders.findOne({}, {}, { sort: { createdAt: -1 } }).then((get) => {
        newOrderID = `ord_000001`
        if (get) {
            const lastOrderID = get.order_id;
            const lastOrderNumber = parseInt(lastOrderID.split('_')[1]);
            // newOrderID = `ord_${lastOrderNumber + 1}`;
            newOrderID = `ord_${(lastOrderNumber + 1).toString().padStart(6, '0')}`
        }
    });


    return newOrderID;
}

// Create Order by Customer
export const createOrder = async (req, res) => {
    let est_price = 0;
    try {
        const { customer_id, address_id, item, schedule_date } = req.body;

        // console.log(item);

        // Generate a random order_id
        const order_id = await generateRandomOrderId();
        if (item.length !== 0) {
            for (const x of item) {
                // const aggregationPipeline = [
                //     {
                //         $match: {
                //             _id: { $in: itemIds }
                //         }
                //     },
                //     {
                //         $addFields: {
                //             weight: weights,
                //             _idArray: itemIds,
                //         }
                //     },
                //     {
                //         $unwind: "$weight"
                //     },
                //     // {
                //     //     $match: {
                //     //         _idArray: { $in: "$_idArray" }
                //     //     }
                //     // },

                //     // {
                //     //     $project: {
                //     //         _id: { $type: "$_id" },
                //     //         priceType: { $type: "$price" },
                //     //         weightType: { $type: "$weight" },
                //     //     }
                //     // },
                //     {
                //         $project: {
                //             _id: '$_id',
                //             total_price: {
                //                 $multiply: [
                //                     { $toDouble: "$price" }, // Convert price to a double
                //                     { $toDouble: "$weight" } // Use the weight field from the document
                //                 ]
                //             }
                //         }
                //     },
                //     // {
                //     //     $group: {
                //     //         _id: "$_id",
                //     //         total_price: { $sum: "$total_price" }
                //     //     }
                //     // }
                // ]
                const itemDoc = await Items.findOne({ _id: x.itemid });
                // console.log(itemDoc);
                if (itemDoc) {
                    est_price += parseFloat(itemDoc.price) * parseFloat(x.weight);
                }



                // console.log(x, est_price, item.indexOf(x) == item.length - 1 && est_price != 0);
                // const totalPriceResult = await Items.aggregate(aggregationPipeline);
                // est_price = totalPriceResult;
                // if (totalPriceResult.length > 0) {
                if (item.indexOf(x) == item.length - 1 && est_price != 0) {
                    const order = await Orders.create({
                        customer_id: customer_id,
                        address_id: address_id,
                        schedule_date: schedule_date,
                        item: req.body.item,
                        est_price: est_price,
                        order_id: order_id,
                    });

                    console.log(order);

                    if (order) {
                        var count = 0
                        console.log(item);
                        for (const x of item) {
                            console.log(x);
                            var getadd = await Address.findOne({ _id: order.address_id })
                            console.log(getadd.city);
                            const itemDoc = await Items.findOne({ _id: x.itemid });

                            if (itemDoc) {
                                const orderitem = await Orderitems.create({
                                    order_id: new mongoose.Types.ObjectId(order._id),
                                    item_id: itemDoc._id,
                                    item_weight: x.weight,
                                    item_price: parseFloat(itemDoc.price),
                                    city: getadd.city,
                                });
                                count += 1
                                console.log(orderitem && count == item.length);
                                if (orderitem && count == item.length) {
                                    res.send({
                                        isSuccess: true,
                                        message: "Create Order Item Individual.",
                                        // order: orderitem
                                    });
                                }
                            }

                        }
                    } else {
                        res.send({
                            isSuccess: false,
                            message: "Failed to create the order.",
                        });
                    }
                }
            }
        }


    } catch (error) {
        console.error(error);
        res.status(500).send({
            isSuccess: false,
            message: "An error occurred while creating the order.",
        });
    }


};


// cancel order by customer
export const cancelOrder = async (req, res) => {
    Orders.findOne({ _id: req.params.orderid, status: -1 }).then((cancelord) => {
        if (cancelord) {
            return res.send({
                isSuccess: true,
                message: "Already Cancel.",
            });
        } else {
            Orders.findByIdAndUpdate({ _id: req.params.orderid }, { $set: { status: -1 } }).then((getord) => {
                if (getord) {
                    return res.send({
                        isSuccess: true,
                        message: "cancelled by customer",
                    });
                } else {
                    return res.send({
                        isSuccess: false,
                        message: "Something went wrong",
                    });
                }
            })
        }
    })

}



// Order conformed by Admin
export const confOrder = async (req, res) => {
    Orders.findOne({ _id: req.params.orderid }).then((conford) => {
        if (conford.status == 1) {
            Orders.findByIdAndUpdate({ _id: req.params.orderid }, { $set: { status: -2 } }).then((getord) => {
                if (getord) {
                    return res.send({
                        isSuccess: true,
                        message: "Reject by admin",
                    });
                } else {
                    return res.send({
                        isSuccess: false,
                        message: "Something went wrong",
                    });
                }
            })
        } else if (conford.status == -2) {
            Orders.findByIdAndUpdate({ _id: req.params.orderid }, { $set: { status: 1 } }).then((getord) => {
                if (getord) {
                    return res.send({
                        isSuccess: true,
                        message: "Confirm by admin",
                    });
                } else {
                    return res.send({
                        isSuccess: false,
                        message: "Something went wrong",
                    });
                }
            })
        }
        else {
            Orders.findByIdAndUpdate({ _id: req.params.orderid }, { $set: { status: 1 } }).then((getord) => {
                if (getord) {
                    return res.send({
                        isSuccess: true,
                        message: "Confirm by admin",
                    });
                } else {
                    return res.send({
                        isSuccess: false,
                        message: "Something went wrong",
                    });
                }
            })
        }
    })
}



// Assign order to Agent by Admin
export const assOrder = async (req, res) => {
    Orders.findOne({ _id: req.params.orderid, status: 2 }).then((assord) => {
        if (assord) {
            return res.send({
                isSuccess: true,
                message: "Already Assign to Agent by Admin.",
            });
        } else {
            Orders.findByIdAndUpdate({ _id: req.params.orderid }, { $set: { status: 2, agent_id: req.body.agentid } }).then((getord) => {
                if (getord) {
                    return res.send({
                        isSuccess: true,
                        message: "Already Assign to Agent.",
                    });
                } else {
                    return res.send({
                        isSuccess: false,
                        message: "Something went wrong",
                    });
                }
            })
        }
    })
}




// Pick up confirm by Agent
export const pConAgent = async (req, res) => {
    if (req.query.status == 4) {
        const conOrd = await Orders.findOneAndUpdate({ _id: req.query.orderid, agent_id: req.params.agentid }, { $set: { status: 4 } })
        if (conOrd) {
            res.json({
                isSuccess: true,
                message: "received by agent"
            });
        } else {
            res.json({
                isSuccess: false,
                message: "Something went wrong.",
            });
        }
    } else if (req.query.status == -3) {
        const conOrd = await Orders.findOneAndUpdate({ _id: req.query.orderid, agent_id: req.params.agentid }, { $set: { status: -3 } })
        if (conOrd) {
            res.json({
                isSuccess: true,
                message: "payment failed"
            });
        } else {
            res.json({
                isSuccess: false,
                message: "Something went wrong.",
            });
        }
    }

}




// Payment confirm by Agent
export const payConfAgent = async (req, res) => {
    if (req.query.status == 5) {
        const conOrd = await Orders.findOneAndUpdate({ _id: req.query.orderid, agent_id: req.params.agentid, status: 4 }, { $set: { status: 5 } })
        console.log(conOrd);
        if (conOrd) {
            res.json({
                isSuccess: true,
                message: "Payment Confirm."
            });
        } else {
            res.json({
                isSuccess: false,
                message: "Something went wrong.",
            });
        }
    } else if (req.query.status == -3) {
        const conOrd = await Orders.findOneAndUpdate({ _id: req.query.orderid, agent_id: req.params.agentid, status: 4 }, { $set: { status: -3 } })
        if (conOrd) {
            res.json({
                isSuccess: true,
                message: "payment failed"
            });
        } else {
            res.json({
                isSuccess: false,
                message: "Something went wrong.",
            });
        }
    }
}




// Get Agent order by filter (All, pending, complete, future)
export const filterOrder = async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const parts = today.split('-');
    const reversedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    console.log(reversedDate);

    if (req.query.filter == '') {
        // const order = await Orders.find()
        const pipeline = [
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customerDetails"
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "item.itemid",
                    foreignField: "_id",
                    as: "itemDetails"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    customer_id: { $first: "$customer_id" },
                    customer_name: {
                        $first: {
                            $let: {
                                vars: { firstCustomer: { $arrayElemAt: ["$customerDetails", 0] } },
                                in: "$$firstCustomer.name"
                            }
                        }
                    },
                    address_id: { $first: "$address_id" },
                    est_price: { $first: "$est_price" },
                    order_id: { $first: "$order_id" },
                    schedule_date: { $first: "$schedule_date" },
                    status: { $first: "$status" },
                    isDelete: { $first: "$isDelete" },
                    item: { $push: "$item" },
                    itemDetails: { $push: "$itemDetails" }
                }
            }
        ];



        const order = await Orders.aggregate(pipeline);
        if (order) {
            return res.send({
                isSuccess: true,
                msg: "Filter All Orders.",
                order: order
            })
        } else {
            return res.send({
                isSuccess: false,
                msg: "Something went wrong.",
            })
        }
    } else if (req.query.order == 'pending' && req.query.filter == reversedDate) { // pendig Order
        // const order = await Orders.find({
        //     status: { $in: [2, 3] },
        //     schedule_date: req.query.filter
        // })

        const pipeline = [
            {
                $match: {
                    status: { $in: [2, 3, 4] },
                    agent_id: req.params.agentid,
                    schedule_date: req.query.filter
                }
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customerDetails"
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "item.itemid",
                    foreignField: "_id",
                    as: "itemDetails"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    customer_id: { $first: "$customer_id" },
                    customer_name: {
                        $first: {
                            $let: {
                                vars: { firstCustomer: { $arrayElemAt: ["$customerDetails", 0] } },
                                in: "$$firstCustomer.name"
                            }
                        }
                    },
                    address_id: { $first: "$address_id" },
                    est_price: { $first: "$est_price" },
                    order_id: { $first: "$order_id" },
                    schedule_date: { $first: "$schedule_date" },
                    status: { $first: "$status" },
                    isDelete: { $first: "$isDelete" },
                    item: { $push: "$item" },
                    itemDetails: { $push: "$itemDetails" }
                }
            }
        ];



        const order = await Orders.aggregate(pipeline);
        console.log(order);
        if (order) {
            return res.send({
                isSuccess: true,
                msg: "Filter Pending Orders.",
                order: order
            })
        } else {
            return res.send({
                isSuccess: false,
                msg: "Something went wrong.",
            })
        }
    } else if (req.query.order == 'complete' && req.query.filter == reversedDate) { // complete Order
        // const order = await Orders.find({
        //     status: { $in: [2, 3] },
        //     schedule_date: req.query.filter
        // })

        const pipeline = [
            {
                $match: {
                    status: { $in: [5] },
                    agent_id: req.params.agentid,
                    schedule_date: req.query.filter
                }
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customerDetails"
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "item.itemid",
                    foreignField: "_id",
                    as: "itemDetails"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    customer_id: { $first: "$customer_id" },
                    customer_name: {
                        $first: {
                            $let: {
                                vars: { firstCustomer: { $arrayElemAt: ["$customerDetails", 0] } },
                                in: "$$firstCustomer.name"
                            }
                        }
                    },
                    address_id: { $first: "$address_id" },
                    est_price: { $first: "$est_price" },
                    order_id: { $first: "$order_id" },
                    schedule_date: { $first: "$schedule_date" },
                    status: { $first: "$status" },
                    isDelete: { $first: "$isDelete" },
                    item: { $push: "$item" },
                    itemDetails: { $push: "$itemDetails" }
                }
            }
        ];



        const order = await Orders.aggregate(pipeline);
        console.log(order);
        if (order) {
            return res.send({
                isSuccess: true,
                msg: "Filter Complete Orders.",
                order: order
            })
        } else {
            return res.send({
                isSuccess: false,
                msg: "Something went wrong.",
            })
        }
    } else if (req.query.order == 'future' && req.query.filter == reversedDate) { // future Order
        // const order = await Orders.find({
        //     status: { $in: [2, 3] },
        //     schedule_date: req.query.filter
        // })

        console.log(moment.utc(req.query.filter, 'DD-MM-YYYY').toDate());

        const pipeline = [

            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customerDetails"
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "item.itemid",
                    foreignField: "_id",
                    as: "itemDetails"
                }
            },
            {
                $addFields: {
                    schedule_date: {
                        $dateFromString: {
                            dateString: "$schedule_date",
                            format: "%d-%m-%Y"
                        }
                    }
                }
            },
            {
                $match: {
                    status: { $in: [2] },
                    agent_id: req.params.agentid,
                    schedule_date: { $gt: moment.utc(req.query.filter, 'DD-MM-YYYY').toDate() }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    customer_id: { $first: "$customer_id" },
                    customer_name: {
                        $first: {
                            $let: {
                                vars: { firstCustomer: { $arrayElemAt: ["$customerDetails", 0] } },
                                in: "$$firstCustomer.name"
                            }
                        }
                    },
                    address_id: { $first: "$address_id" },
                    est_price: { $first: "$est_price" },
                    order_id: { $first: "$order_id" },
                    schedule_date: { $first: "$schedule_date" },
                    status: { $first: "$status" },
                    isDelete: { $first: "$isDelete" },
                    item: { $push: "$item" },
                    itemDetails: { $push: "$itemDetails" }
                }
            },

        ];



        const order = await Orders.aggregate(pipeline);
        console.log(order);
        if (order) {
            return res.send({
                isSuccess: true,
                msg: "Filter Future Orders.",
                order: order
            })
        } else {
            return res.send({
                isSuccess: false,
                msg: "Something went wrong.",
            })
        }
    }
}




// OrderHistory by customer_id from order table
export const orderHist = async (req, res) => {
    // Orders.find({ customer_id: req.params.custid }).then((getord) => {
    //     // console.log(getord);
    //     for (const x of getord.item) {
    //         Items.findOne({ _id: x.itemid }).then((getitem) => {
    //             getitem.item_name
    //         })
    //     }
    //     return res.send({
    //         isSuccess: true,
    //         message: "Order History",
    //         data: getord
    //     });
    // })
    const usertype = await Users.findOne({ _id: req.params.custid, usertype: "admin" })
    console.log(usertype);
    if (usertype) {
        const pipeline = [
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customerDetails"
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "item.itemid",
                    foreignField: "_id",
                    as: "itemDetails"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    customer_id: { $first: "$customer_id" },
                    customer_name: {
                        $first: {
                            $let: {
                                vars: { firstCustomer: { $arrayElemAt: ["$customerDetails", 0] } },
                                in: "$$firstCustomer.name"
                            }
                        }
                    },
                    address_id: { $first: "$address_id" },
                    est_price: { $first: "$est_price" },
                    order_id: { $first: "$order_id" },
                    schedule_date: { $first: "$schedule_date" },
                    status: { $first: "$status" },
                    isDelete: { $first: "$isDelete" },
                    item: { $push: "$item" },
                    itemDetails: { $push: "$itemDetails" },
                    createdAt: { $first: "$createdAt" },
                }
            },
            {
                $sort: {
                    createdAt: -1 // 1 for ascending order, -1 for descending order
                }
            }
        ];

        const result = await Orders.aggregate(pipeline);

        if (result) {
            res.json({
                isSuccess: true,
                message: "Order History",
                data: result
            });
        } else {
            res.json({
                isSuccess: false,
                message: "Something went wrong.",
            });
        }
    } else {
        const pipeline = [
            {
                $match: {
                    customer_id: new mongoose.Types.ObjectId(req.params.custid)
                }
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customerDetails"
                }
            },
            {
                $lookup: {
                    from: "items",
                    localField: "item.itemid",
                    foreignField: "_id",
                    as: "itemDetails"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    customer_id: { $first: "$customer_id" },
                    customer_name: {
                        $first: {
                            $let: {
                                vars: { firstCustomer: { $arrayElemAt: ["$customerDetails", 0] } },
                                in: "$$firstCustomer.name"
                            }
                        }
                    },
                    address_id: { $first: "$address_id" },
                    est_price: { $first: "$est_price" },
                    order_id: { $first: "$order_id" },
                    schedule_date: { $first: "$schedule_date" },
                    status: { $first: "$status" },
                    isDelete: { $first: "$isDelete" },
                    item: { $push: "$item" },
                    itemDetails: { $push: "$itemDetails" },
                    createdAt: { $first: "$createdAt" },
                }
            },
            {
                $sort: {
                    createdAt: -1 // 1 for ascending order, -1 for descending order
                }
            }
        ];

        const result = await Orders.aggregate(pipeline);

        if (result) {
            res.json({
                isSuccess: true,
                message: "Order History",
                data: result
            });
        } else {
            res.json({
                isSuccess: false,
                message: "Something went wrong.",
            });
        }
    }
}




// GetOrderById => order detail by _id from order table
export const orderHistById = async (req, res) => {

    // console.log(getord);
    const pipeline = [
        // First, match the order by _id
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params.orderid)
            }
        },
        // Then, unwind the 'item' array to prepare for the join
        // {
        //     $unwind: "$item"
        // },
        // Next, perform a $lookup to join with the 'items' collection
        {
            $lookup: {
                from: "items",
                localField: "item.itemid",
                foreignField: "_id",
                as: "itemDetails"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "agent_id",
                foreignField: "_id",
                as: "agent"
            }
        },
        // Unwind the result of the $lookup to get individual item details
        // {
        //     $unwind: "$itemDetails"
        // },
        // Finally, group the data as needed
        // {
        //     $group: {
        //         _id: "$_id", // Group by the order's _id
        //         order: { $first: "$$ROOT" }, // Keep the entire order document
        //         items: { $push: "$itemDetails" } // Push the item details into an 'items' array
        //     }
        // }
        {
            $group: {
                _id: "$_id",
                customer_id: { $first: "$customer_id" },
                address_id: { $first: "$address_id" },
                est_price: { $first: "$est_price" },
                order_id: { $first: "$order_id" },
                schedule_date: { $first: "$schedule_date" },
                status: { $first: "$status" },
                isDelete: { $first: "$isDelete" },
                createdAt: { $first: "$createdAt" },
                item: { $push: "$item" },
                itemDetails: { $push: "$itemDetails" },
                agent: { $first: "$agent" }
                // order: { $first: "$$ROOT" },
                // items: { $push: "$itemDetails" }
            }
        }
    ];



    const result = await Orders.aggregate(pipeline);
    // res.send(result);
    Orders.findOne({ _id: req.params.orderid, }).then(async (getord) => {
        if (getord && result) {
            const add = await Address.findOne({ _id: getord.address_id })
            const cust = await Customers.findOne({ _id: getord.customer_id })
            console.log(add, cust);
            if (add && cust) {
                var getIndOrd = {
                    "result": result,
                    // "item": getord.item,
                    "city": add.city,
                    "state": add.state,
                    "pin": add.PIN,
                    "name": cust.name,
                    "mobile": cust.mobile,
                    "email": cust.email,
                    "location": add.location,
                    "landmark": add.landmark
                }
                if (getIndOrd) {
                    return res.send({
                        isSuccess: true,
                        message: "Individual Order History",
                        data: getIndOrd
                    });
                }

            }
        }
    })
}

