/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// User CRUD
Route.post('/users-create', 'UsersController.create')
Route.post('/users-update', 'UsersController.update')
Route.post('/users-delete', 'UsersController.delete')
Route.post('/users-list', 'UsersController.list')

// User Auth
Route.get('/logout', 'AuthController.logout')
Route.post('/login', 'AuthController.login')

// Gallery Store
Route.post('/gallery-store', 'GalleriesController.store')
Route.post('/gallery-update', 'GalleriesController.updateMetadata')
Route.post('/gallery-delete', 'GalleriesController.delete')
Route.get('/gallery-list', 'GalleriesController.list')

