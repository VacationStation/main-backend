define({ "api": [  {    "type": "get",    "url": "/finance/group/:id",    "title": "getGroupSaldo",    "name": "getGroupSaldo",    "group": "Finance",    "description": "<p>Returns Group saldo</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Groups unique ID</p>"          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "GroupNotFound",            "description": "<p>The id of the Group was not found</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/FinanceRouter.ts",    "groupTitle": "Finance"  },  {    "type": "get",    "url": "/finance/user/:id",    "title": "getUserSaldo",    "name": "getUserSaldo",    "group": "Finance",    "description": "<p>Returns User saldo</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Users unique ID</p>"          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "UserNotFound",            "description": "<p>The id of the Group was not found</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/FinanceRouter.ts",    "groupTitle": "Finance"  },  {    "type": "post",    "url": "/group/:id/addBill",    "title": "addBill",    "name": "addBill",    "group": "Group",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Groups unique ID</p>"          },          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "bill",            "description": ""          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "bill.image",            "description": "<p>Image id</p>"          },          {            "group": "Parameter",            "type": "Object[]",            "optional": false,            "field": "bill.positions",            "description": "<p>Array of Positions. If you want to add a total: only provide one Position of Type: TOTAL, quantity 1 and price as your total sum</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "bill.positions.type",            "description": "<p>TOTAL / ITEM</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "bill.positions.quantity",            "description": ""          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "bill.positions.price",            "description": "<p>Price in EUR cent</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "bill.positions.name",            "description": ""          },          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "data",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "data.usage",            "description": "<p>Usage of expense</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "data.biller",            "description": "<p>User ID of the User who submits the invoice</p>"          },          {            "group": "Parameter",            "type": "Boolean",            "optional": false,            "field": "data.forAll",            "description": "<p>True if the bill is for all Group Members. Otherwise you have to provide recipients and set forAll to False.</p>"          },          {            "group": "Parameter",            "type": "String[]",            "optional": true,            "field": "data.recipients",            "description": "<p>Array of Group Members (ID's)</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "       {\n\t\t\t\"bill\": {\n\t\t        \"image\" : \"imageId\",\n\t\t        \"positions\" : [\n\t\t               {\n\t\t                  \"type\" : \"TOTAL\",\n\t\t                  \"quantity\" : \"1\",\n\t\t                  \"price\" : \"12345\",\n\t\t                  \"name\" : \"Your total bill\"\n\t\t               },...\n\t\t           ]\n\t        },\n\t        \"data\": {\n\t            \"usage\": \"for use\"\n\t            \"biller\": \"1\",\n\t            \"forAll\" : true\n\t        }\n\t\t }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/GroupRouter.ts",    "groupTitle": "Group"  },  {    "type": "post",    "url": "/group",    "title": "addGroup",    "name": "addGroup",    "group": "Group",    "description": "<p>Adds a new Group</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "groupName",            "description": ""          },          {            "group": "Parameter",            "type": "Text",            "optional": false,            "field": "groupDescription",            "description": ""          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Group ID</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "invitationKey",            "description": "<p>The invitation key new users have to provide if they want to join the group //TODO add group fields</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/GroupRouter.ts",    "groupTitle": "Group"  },  {    "type": "put",    "url": "/group/:groupId/add/:userId",    "title": "addUser",    "name": "addUser",    "group": "Group",    "description": "<p>Add User to Group if provided initation key is valid</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "groupId",            "description": "<p>Groups unique ID</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "userId",            "description": "<p>Users unique ID</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "key",            "description": "<p>The invitation key a Group member has provided.</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "       {\n\t\t\t\"key\": \"InviteMe\"\n\t\t }",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "GroupNotFound",            "description": "<p>The id of the Group was not found</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "UserNotFound",            "description": "<p>The id of the User was not found</p>"          }        ],        "Error Invalid": [          {            "group": "Error Invalid",            "optional": false,            "field": "InvalidKey",            "description": "<p>The invitationKey is invalid</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/GroupRouter.ts",    "groupTitle": "Group"  },  {    "type": "get",    "url": "/group/:id",    "title": "getGroup",    "name": "getGroup",    "group": "Group",    "description": "<p>Returns Group data by id</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Groups unique ID</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Group ID //TODO add group fields</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n{\n \"success\": true,\n \"group\": {\n     \"id\" : \"\",\n     ...\n }\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "GroupNotFound",            "description": "<p>The id of the Group was not found</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/GroupRouter.ts",    "groupTitle": "Group"  },  {    "type": "get",    "url": "/group/user/:id",    "title": "getGroupsByUser",    "name": "getGroupsByUser",    "group": "Group",    "description": "<p>Get all Groups the given User is member of</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Users unique ID</p>"          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "UserNotFound",            "description": "<p>The id of the User was not found</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/GroupRouter.ts",    "groupTitle": "Group"  },  {    "type": "get",    "url": "/group/invite/:id",    "title": "getInvitation",    "name": "getInvotation",    "group": "Group",    "description": "<p>Returns Group invitation link</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Groups unique ID</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "invitationKey",            "description": ""          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "GroupNotFound",            "description": "<p>The id of the Group was not found</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/GroupRouter.ts",    "groupTitle": "Group"  },  {    "type": "post",    "url": "/group/:id/makeDeposit",    "title": "makeDeposit",    "name": "makeDeposit",    "group": "Group",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Groups unique ID</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "userID",            "description": "<p>The Users ID</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "amount",            "description": "<p>Amount in EUR Cent</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "usage",            "description": "<p>Optional Note</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "       {\n\t\t\t\"biller\" : \"1\",\n\t\t   \"amount\" : 2085,\n\t\t }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/GroupRouter.ts",    "groupTitle": "Group"  },  {    "type": "delete",    "url": "/group/:groupId/remove/:userId",    "title": "removeUser",    "name": "removeUser",    "group": "Group",    "description": "<p>Remove User from Group</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "groupId",            "description": "<p>Groups unique ID</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "userId",            "description": "<p>Users unique ID</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "ownerId",            "description": "<p>The id of the User who wants to remove an User. Only the Group owner is allowed to remove User from Group.</p>"          }        ]      },      "examples": [        {          "title": "Request-Example:",          "content": "       {\n\t\t\t\"id\": \"1\"\n\t\t }",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "GroupNotFound",            "description": "<p>The id of the Group was not found</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "UserNotFound",            "description": "<p>The id of the User was not found</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/GroupRouter.ts",    "groupTitle": "Group"  },  {    "type": "post",    "url": "/image",    "title": "addImage",    "name": "addImage",    "group": "Image",    "description": "<p>Adds new Image</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "image",            "description": "<p>Image data as base64 encoded string</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "imageId",            "description": ""          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/ImageRouter.ts",    "groupTitle": "Image"  },  {    "type": "get",    "url": "/image/:id",    "title": "getImage",    "name": "getImage",    "group": "Image",    "description": "<p>Returns Image data</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "image",            "description": "<p>Image data as base64 encoded string</p>"          },          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "meta",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "meta.description",            "description": ""          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "ImageNotFound",            "description": "<p>The id of the Image was not found</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/ImageRouter.ts",    "groupTitle": "Image"  },  {    "type": "post",    "url": "/user",    "title": "addUser",    "name": "addUser",    "group": "User",    "description": "<p>Adds a new User</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "loginName",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "firstName",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "lastName",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mail",            "description": ""          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>User ID //TODO add user fields</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/UserRouter.ts",    "groupTitle": "User"  },  {    "type": "delete",    "url": "/user/:id",    "title": "deleteUser",    "name": "deleteUser",    "group": "User",    "description": "<p>Deletes User with given id</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Users unique ID</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/UserRouter.ts",    "groupTitle": "User"  },  {    "type": "get",    "url": "/user/:id",    "title": "getUser",    "name": "getUser",    "group": "User",    "description": "<p>Returns User data by id</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Users unique ID</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>User ID //TODO add user fields</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n{\n \"success\": true,\n \"user\": {\n     \"id\" : \"\",\n     ...\n }\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "UserNotFound",            "description": "<p>The id of the User was not found</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/routes/UserRouter.ts",    "groupTitle": "User"  }] });
