// Imports
// var pg = require('pg');

var Sequelize = require('sequelize');
var moment = require('moment');

// Establish connection
var sequelize = new Sequelize('postgres://postgres:pass@localhost/sgvaktsys',
    {
        logging: false,
        define: {
            timestamps: false,
            underscored: true
        }
    }
);

// Define models
var User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pass: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'user'
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '/img/default.jpg'
    }
});
var Bar = sequelize.define('bar', {
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});
var UserShift = sequelize.define('user_shift', {
    barShiftId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'bar_shift_id'
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    role: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});
var BarShift = sequelize.define('bar_shift', {
    barId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'bar_id'
    },
    start: {
        type: Sequelize.DATE,
        allowNull: false
    },
    stop: {
        type: Sequelize.DATE,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
    }
});

exports.getAllBars = function() {
    return Bar.findAll({
        order: [
            ['name', 'ASC']
        ]
    });
}
exports.getShifts = function(date) {



    // var query = 'SELECT bars.name AS bar, start, stop, bar_shifts.description, ' +
    //             'users.id AS user_id, users.name, users.image, user_shifts.role ' +
    //             'FROM bars, user_shifts, bar_shifts, users ' +
    //             'WHERE user_shifts.bar_shift_id = bar_shifts.id ' +
    //             'AND user_shifts.user_id = users.id ' +
    //             'AND bars.id = bar_shifts.bar_id' +
    //             (date !== '-' ? ' AND DATE(bar_shifts.start)=DATE(\'' + date + '\');' : ';');

    // return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
}

exports.verifyUser = function(username, password) {
    return User.findOne({
        attributes: ['id', 'role'],
        where: {
            email: username,
            pass: password
        }
    });
}