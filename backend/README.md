<h1 align="center">
  <img alt="Be The Hero" title="Be The Hero" src="https://github.com/henriquecampaner/beahero/blob/master/frontend/src/assets/logo.svg" width="300px" /> <br />
	API
</h1>

## :rocket: Technology

This project was developed with the following technologies:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [nodemon](https://nodemon.io/)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Jest](https://jestjs.io/)
- [supertest](https://github.com/visionmedia/supertest)
- [Sqlite3](https://www.sqlite.org/index.html)
- [Knex](http://knexjs.org/)
- [celebrate](https://www.npmjs.com/package/celebrate/)
- [VS Code](https://code.visualstudio.com/) with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)




## Routes


### Sessions

Used for admin authentication only:

Method | URI | Parameters | Body | Description | Return |
-------|-----|:----------:|:----:|-----------|:-------:|
POST | /sessions | ❌ | <code><span style="color:red">id</span></code> | Login. | `Id` |


### ONGS
Method | URI | Parameters | Body | Description | Return |
-------|-----|:----------:|:----:|-----------|:-------:|
POST | /ongs | ❌ | <code><span style="color:red">name</span></code>, <code><span style="color:red">email</span></code>, <code><span style="color:red">whatsapp</code></span>, <code><span style="color:red">city</span></code>, <code><span style="color:red">country</span></code> | Create new ONG | `{ id }` |
GET | /ongs | ❌ | ❌ | List ONG | `{ ongs }` |

### Incidents

Routes to manage incidents

Method | URI | Parameters | Body | Description | Return |
-------|-----|:----------:|:----:|-----------|:-------:|
GET | /ongs | page | ❌ | ❌| `{ incidents }` |


### ONG routes: Requires Headers Authorization

>For all of the following routes, ** Headers Authorization ** must be sent.

### Incidents

Routes to manage incidents

Method | URI | Parameters | Body | Description | Return |
-------|-----|:----------:|:----:|-----------|:-------:|
POST | /incidents | `AUTHORIZATION` | <code><span style="color:red">title</span></code>, <code><span style="color:red">description</span></code>, <code><span style="color:red">value | Create a new incident | `{ id, title, description, value }` |
DELETE | /incidents/:id | `AUTHORIZATION` and `id`: id referring to the ONG in the database | ❌ | Delete a Incident | `{ }` |
