var mongoose;

exports._connect = function (m) {
	mongoose = m;
	return;
};

exports.on_duty = function (req, res) {
	
	res.set('Access-Control-Allow-Origin', '*');

	var Shift = mongoose.model('Shift');
	Shift
		.find({
			start: {
				$lte: new Date()
			},
			end: {
				$gte: new Date()
			}
		})
		.populate('_member')
		.exec(function (err, shifts) {

			var data = [];
			
			if (shifts) {

				shifts.forEach(function (shift) {
					if (shift._member) {
						data.push({
							name: shift._member.name.first + ' ' + shift._member.name.last,
							start: shift.start,
							end: shift.end,
							phone: shift._member.phone,
							address: shift._member.campus_address,
							unit: shift._member.unit
						});
					}
				});

				res.json(data);
			} else {
				res.json([]);
			}
	});
};
