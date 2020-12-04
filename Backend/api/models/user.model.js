const sql = require("./db.js");

// constructor
/**
 * Construct a user.
 * @constructor
 * @param {JSON} user - The user json file
 * 
 */
const User = function(user) {
  this.Name = user.Name;
  this.Password = user.Password;
  this.Contact = user.Contact;
  this.Email =  user.Email;
  this.Type = user.Type;
};

/**
 * Create a user.
 * 
 * @param {User} newUser - a User object you want to create
 * @param {function} result - The handler function of the result
 */

User.create = (newUser, result) => {
  sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created USER: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
/**
 *  Find a user by its id
 * 
 * @param {int} UserId - The userid of the user you want to find
 * @param {function} result - The handler function of the result
 */
User.findById = (UserId, result) => {
  sql.query(`SELECT * FROM User WHERE UserID = ${UserId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};
/**
 * Get all the users
 * 
 * 
 * @param {function} result - The handler function of the result
 */
User.getAll = result => {
  sql.query("SELECT * FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};
/**
 * Update a user.
 * @param {int} id -The userid of the user you want to update
 * @param {User} user - The User object you want to update the user with 
 * @param {function} result - The handler function of the result
 */
User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE User SET Email = ?, Name = ?, Password = ?,Contact = ?, Type = ? WHERE UserID = ?",
    [user.Email, user.Name, user.Password,user.Contact,user.Type, id ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated User: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};
/**
 * Remove a user.
 * 
 * @param {int} id - The userid of the user you want to remove
 * @param {function} result - The handler function of the result
 */
User.remove = (id, result) => {
  sql.query("DELETE FROM User WHERE UserID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted User with id: ", id);
    result(null, res);
  });
};
/**
 * Remove all users.
 * 
 * 
 * @param {function} result - The handler function of the result
 */
User.removeAll = result => {
  sql.query("DELETE FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Users`);
    result(null, res);
  });
};

module.exports = User;