const {Caller} = require('./Caller.js');
const caller = new Caller(); 
const cc = require('cli-color')
const Pool = require('pg').Pool
const database = 'calendar3000'
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: database,
  password: 'password',
  port: 5432,
})

const showDBMsg = () => {
  caller.msg("database: " + cc.bgGreen(database))
}
// /////////////////////// NO-SQL //////////////////////////////////////////
const insertJsonObject = (request, response) => {
    caller.showStack()
    pool.query('INSERT INTO validatedTable (data) VALUES($1)', [request.body], (error, results) => {
    if (error) {
      console.log("Error " + error )
      response.status(500).send(`Validation constraint fail ${error}`)
    } else {
      response.status(201).send(`insert into validatedtable ${JSON.stringify(request.body)}`)
    }
  })
}

const getJsonObjects = (request, response) => {
  caller.showStack()

  pool.query('SELECT * FROM validatedTable', (error, results) => {
    if (error) {
      console.log("Error " + error )
      response.status(500).send(`getJsonObjects fail! `)

    } else {
      console.log("It is OK ")
      response.status(200).json( results.rows)
    }
  })
}


const getJsonObjectsById = (request, response) => {
  caller.showStack()
  const id = parseInt(request.params.id)
  let sql = "SELECT * FROM validatedTable WHERE (data #>> '{id}')::numeric = $1"
  const d1 = new Date().getTime() 

  pool.query(sql, [id], (error, results) => {

    if (error) {
      console.log("Error " + error )
      response.status(500).send(`getUserById fail ${error}`)
    } else {
      const d2 = new Date().getTime() 
      console.log("MS elapsed " + ( d2 - d1 ))
      response.status(200).json(results.rows)
    }
  })
}


const getHolidaysForYear = (request, response) => {
  caller.showStack()
  const id = parseInt(request.params.id)
  let sql = "SELECT * FROM validatedTable WHERE (data #>> '{id}')::numeric = $1"
  const d1 = new Date().getTime() 

  pool.query(sql, [id], (error, results) => {

    if (error) {
      console.log("Error " + error )
      response.status(500).send(`getUserById fail ${error}`)
    } else {
      const d2 = new Date().getTime() 
      console.log("MS elapsed " + ( d2 - d1 ))
      response.status(200).json(results.rows)
    }
  })
}






// /////////////////////// TRADITIONAL //////////////////////////////////////////


const getUsers = (request, response) => {
  caller.showStack()
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log("Error " + error )
      response.status(500).send(`getUsers fail ${error}`)
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const getUserById = (request, response) => {
  caller.showStack()
  const id = parseInt(request.params.id)
  const d1 = new Date().getTime() 
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log("Error " + error )
      response.status(500).send(`getUserById fail ${error}`)
    } else {
      const d2 = new Date().getTime() 
      console.log("MS elapsed " + (d2 - d1))
      response.status(200).json(results.rows)
    }
  })
}

const createUser = (request, response) => {
  caller.showStack()
  const { name, email } = request.body
  console.log("name ", name , " email ", email )
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    
    if (error) {
      console.log("Error " + error )
      response.status(500).send(`createUser fail ${error}`)
    }
    else {
      response.status(200).json("User added")
    }
  })
}

const updateUser = (request, response) => {
  caller.showStack()
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        console.log("Error " + error )
        response.status(500).send(`updateUser fail ${error}`)
      } else { 
        response.status(200).send(`User modified with ID: ${id}`)
      } 
    }
  )
}

const deleteUser = (request, response) => {
  caller.showStack()
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log("Error " + error )
      response.status(500).send(`deleteUser fail ${error}`)
    } else {
    response.status(200).send(`User deleted with ID: ${id}`)
    }
  })
}


// /////////////////////// calendar3000 //////////////////////////////////////////


const getHolidaysByYear = (request, response) => {
  caller.showStack()

  const year = parseInt(request.params.year)
  const d1 = new Date().getTime() 
  pool.query('SELECT data FROM holidays WHERE year = $1', [year], (error, results) => {
    if (error) {
      caller.errorMsg( error )
      response.status(500).send(`getHolidaysByYear fail ${error}`)
    } else {
      const d2 = new Date().getTime() 
      caller.msg("MS elapsed " + (d2 - d1))
      response.status(200).json(results.rows)
    }
  })

}

const createPerson = (request, response) => {
  caller.showStack()
  const { name, email } = request.body
  const sql = `INSERT INTO people (name, email) VALUES ( ${name}, ${email})`
  caller.msg(sql)
  pool.query('INSERT INTO people (name, email) VALUES ($1, $2)', [name, email], (error, results) => {    
    if (error) {
      caller.errorMsg( error )
      response.status(500).send(`createUser fail ${error}`)
    }
    else {
      response.status(200).json("person created")
      caller.msg("Success")
    }
  })
}

const getAllPeople = (request, response) => {
  caller.showStack()
  const sql = `SELECT * FROM people`
  caller.msg(sql)
  pool.query(sql, [], (error, results) => {    
    if (error) {
      caller.errorMsg( error )
      response.status(500).send(`getAllPeople fail ${error}`)
    }
    else {
      response.status(200).json(results.rows)      
      caller.msg("Success")
    }
  })
}


// /////////////////////// END CALENDAR 3000 //////////////////////



module.exports = {
  // getUsers,
  // getUserById,
  // createUser,
  // updateUser,
  // deleteUser,
  // insertJsonObject,
  // getJsonObjects,
  // getJsonObjectsById,
  showDBMsg,
  getHolidaysByYear,
  createPerson,
  getAllPeople
}
