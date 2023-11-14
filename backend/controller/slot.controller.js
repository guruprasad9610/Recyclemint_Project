import Slots from "../model/slot.model.js";



// Slot create by Admin
export const createSlot = async (req, res) => {
    Slots.findOne({ month: req.body.month, year: req.body.year }).then(async (getslot) => {
          
        if (getslot) {
            await Slots.findOneAndUpdate({ month: req.body.month, year: req.body.year }, { $addToSet: { "date": req.body.date } }).then((updateSlot) => {
                if (updateSlot) {
                    res.send({
                        isSuccess: true,
                        msg: "Slot Update by Admin."
                    })
                } else {
                    res.send({
                        isSuccess: false,
                        msg: "Somethoing went wrong."
                    })
                }
            })
        } else {
            const slot = await Slots.create({
                month: req.body.month,
                year: req.body.year,
                date: req.body.date
            });

            if (slot) {
                res.send({
                    isSuccess: true,
                    msg: "Slot added by Admin."
                })
            }
        }
    })

}



// get All Slot-Date
export const allSlot = async (req, res) => {
    const pipeline = [
        {
          $project: {
            month: 1,
            year: 1,
            date: {
              $map: {
                input: "$date",
                as: "date",
                in: {
                  $dateFromString: {
                    dateString: "$$date",
                    format: "%d-%m-%Y"
                  }
                }
              }
            },
            createdAt: 1,
            updatedAt: 1,
          },
        },
        {
          $unwind: "$date"
        },
        {
          $sort: { "date": 1 }
        },
        {
          $group: {
            _id: { _id: "$_id", month: "$month", year: "$year", createdAt: "$createdAt", updatedAt: "$updatedAt" },
            date: { $push: { $dateToString: { format: "%d-%m-%Y", date: "$date" } } }
          }
        },
        {
          $project: {
            _id: "$_id._id",
            month: "$_id.month",
            year: "$_id.year",
            date: 1,
            createdAt: "$_id.createdAt",
            updatedAt: "$_id.updatedAt"
          }
        }
      ];
  
      const result = await Slots.aggregate(pipeline);
      console.log(result);

    // const result = await Slots.find()

      if (result) {
                return res.send({
                    isSuccess: true,
                    msg: "Get All slot.",
                    data: result
                })
            }
}




