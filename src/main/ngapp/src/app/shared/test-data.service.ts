/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from "@angular/core";
import { ConnectionStatus } from "@connections/shared/connection-status";
import { ConnectionTable } from "@connections/shared/connection-table.model";
import { Connection } from "@connections/shared/connection.model";
import { SchemaInfo } from "@connections/shared/schema-info.model";
import { ServiceCatalogSource } from "@connections/shared/service-catalog-source.model";
import { ConnectionSummary } from "@dataservices/shared/connection-summary.model";
import { Dataservice } from "@dataservices/shared/dataservice.model";
import { PublishState } from "@dataservices/shared/publish-state.enum";
import { QueryResults } from "@dataservices/shared/query-results.model";
import { VdbStatus } from "@dataservices/shared/vdb-status.model";
import { Vdb } from "@dataservices/shared/vdb.model";
import { Virtualization } from "@dataservices/shared/virtualization.model";

@Injectable()
export class TestDataService {

  private static readonly connectionVdbSuffix = "btlconn";
  private static readonly connectionSchemaModelSuffix = "schemamodel";
  private static readonly connectionSchemaVdbSuffix = "schemavdb";

  private static readonly pgConnCatalogSourceId = "postgresql-persistent-lq6sg";
  private static readonly catalogSourceId1 = "postgresql-persistent-j9vqv";
  private static readonly catalogSourceId2 = "postgresql-persistent-a8xrt";
  private static readonly catalogSourceId3 = "mysql-persistent-t3irv";
  private static readonly catalogSourceId4 = "mongodb-persistent-x9prt";
  private static readonly catalogSourceId5 = "mongodb-persistent-z8amy";

  // =================================================================
  // VDBs
  // =================================================================

  private static accountsVdb = Vdb.create(
    {
      keng__id: "AccountsVDB",
      vdb__description: "This is an accounts VDB.",
      keng__dataPath: "/path/in/repository/AccountsVDB",
      keng__kType: "Vdb",
      vdb__name: "AccountsVDB",
      vdb__originalFile: "/Users/dsbUser/vdbs/accounts.vdb",
      vdb__preview: false,
      vdb__version: "1"
    }
  );

  private static employeesVdb = Vdb.create(
    {
      keng__id: "EmployeesVDB",
      vdb__description: "This is an employees VDB.",
      keng__dataPath: "/path/in/repository/EmployeesVDB",
      keng__kType: "Vdb",
      vdb__name: "EmployeesVDB",
      vdb__originalFile: "/Users/dsbUser/vdbs/employees.vdb",
      vdb__preview: false,
      vdb__version: "1"
    }
  );

  private static productsVdb = Vdb.create(
    {
      keng__id: "ProductsVDB",
      vdb__description: "This is a products VDB.",
      keng__dataPath: "/path/in/repository/ProductsVDB",
      keng__kType: "Vdb",
      vdb__name: "ProductsVDB",
      vdb__originalFile: "/Users/dsbUser/vdbs/products.vdb",
      vdb__preview: false,
      vdb__version: "1"
    }
  );

  // =================================================================
  // VDB Status
  // =================================================================

  private static status1 = VdbStatus.create(
    {
      "name": TestDataService.accountsVdb.getName(),
      "deployedName": TestDataService.accountsVdb.getName() + "-vdb.xml",
      "version": TestDataService.accountsVdb.getVersion(),
      "active": true,
      "loading": false,
      "failed": false,
      "errors": []
    }
  );

  private static status2 = VdbStatus.create(
    {
      "name": TestDataService.employeesVdb.getName(),
      "deployedName": TestDataService.employeesVdb.getName() + "-vdb.xml",
      "version": TestDataService.employeesVdb.getVersion(),
      "active": true,
      "loading": false,
      "failed": false,
      "errors": []
    }
  );

  private static status3 = VdbStatus.create(
    {
      "name": TestDataService.productsVdb.getName(),
      "deployedName": TestDataService.productsVdb.getName() + "-vdb.xml",
      "version": TestDataService.productsVdb.getVersion(),
      "active": true,
      "loading": false,
      "failed": false,
      "errors": []
    }
  );

  private static vdbStatuses =
    {
      "keng__baseUri": "http://das-beetle-studio.192.168.42.142.nip.io/vdb-builder/v1/",
      "vdbs": [
        {
          "name": TestDataService.accountsVdb.getName(),
          "deployedName": TestDataService.accountsVdb.getName() + "-vdb.xml",
          "version": TestDataService.accountsVdb.getVersion(),
          "active": true,
          "loading": false,
          "failed": false,
          "errors": []
        },
        {
          "name": TestDataService.employeesVdb.getName(),
          "deployedName": TestDataService.employeesVdb.getName() + "-vdb.xml",
          "version": TestDataService.employeesVdb.getVersion(),
          "active": true,
          "loading": false,
          "failed": false,
          "errors": []
        },
        {
          "name": TestDataService.productsVdb.getName(),
          "deployedName": TestDataService.productsVdb.getName() + "-vdb.xml",
          "version": TestDataService.productsVdb.getVersion(),
          "active": true,
          "loading": false,
          "failed": false,
          "errors": []
        }
      ],
      "keng___links": [
        {
          "rel": "self",
          "href": "http://localhost:4200/vdb-builder/v1/metadata/status/vdbs"
        },
        {
          "rel": "parent",
          "href": "http://localhost:4200/vdb-builder/v1/metadata/status"
        }
      ]
    };

  // =================================================================
  // ServiceCatalog DataSources
  // =================================================================
  private static pgConnCatalogSource = TestDataService.createServiceCatalogSource(
    TestDataService.pgConnCatalogSourceId,
    TestDataService.pgConnCatalogSourceId,
    "postgresql",
    true );
  private static catalogSource1 = TestDataService.createServiceCatalogSource(
    TestDataService.catalogSourceId1,
    TestDataService.catalogSourceId1,
    "postgresql",
    true );
  private static catalogSource2 = TestDataService.createServiceCatalogSource(
    TestDataService.catalogSourceId2,
    TestDataService.catalogSourceId2,
    "postgresql",
    true );
  private static catalogSource3 = TestDataService.createServiceCatalogSource(
    TestDataService.catalogSourceId3,
    TestDataService.catalogSourceId3,
    "mysql",
    true );
  private static catalogSourceMongo1 = TestDataService.createServiceCatalogSource(
    TestDataService.catalogSourceId4,
    TestDataService.catalogSourceId4,
    "mongodb",
    true );
  private static catalogSourceMongo2 = TestDataService.createServiceCatalogSource(
    TestDataService.catalogSourceId5,
    TestDataService.catalogSourceId5,
    "mongodb",
    true );

  // =================================================================
  // Connections
  // =================================================================

  private static pgConn = Connection.create(
    {
      "keng__baseUri": "http://localhost:4200/vdb-builder/v1/",
      "keng__id": "PGConn",
      "keng__dataPath": "/tko:komodo/tko:workspace/admin/PGConn",
      "keng__kType": "Connection",
      "keng__hasChildren": false,
      "dv__jndiName": "java:/postgresql-persistent-lq6sg",
      "dv__driverName": "postgresql",
      "dv__type": true,
      "keng__properties": [
        {
          "name": "description",
          "value": "Postgres connection"
        },
        {
          "name": "serviceCatalogSource",
          "value": "postgresql-persistent-lq6sg"
        }
      ],
      "keng___links": [
        {
          "rel": "self",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/connections/PGConn"
        },
        {
          "rel": "parent",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/connections"
        },
        {
          "rel": "children",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/search?parent=%2Ftko%3Akomodo%2Ftko%3Aworkspace%2Fadmin%2FPGConn"
        }
      ]
    }
  );

  private static conn1 = Connection.create(
    {
      "keng__baseUri": "http://localhost:4200/vdb-builder/v1/",
      "keng__id": "conn1",
      "keng__dataPath": "/tko:komodo/tko:workspace/admin/conn1",
      "keng__kType": "Connection",
      "keng__hasChildren": false,
      "dv__jndiName": "java:/postgresql-persistent-j9vqv",
      "dv__driverName": "postgresql",
      "dv__type": true,
      "keng__properties": [
        {
          "name": "description",
          "value": "Postgres connection"
        },
        {
          "name": "serviceCatalogSource",
          "value": "postgresql-persistent-j9vqv"
        }
      ],
      "keng___links": [
        {
          "rel": "self",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/connections/conn1"
        },
        {
          "rel": "parent",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/connections"
        },
        {
          "rel": "children",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/search?parent=%2Ftko%3Akomodo%2Ftko%3Aworkspace%2Fadmin%2Fconn1"
        }
      ]
    }
  );

  private static conn2 = Connection.create(
    {
      "keng__baseUri": "http://localhost:4200/vdb-builder/v1/",
      "keng__id": "conn2",
      "keng__dataPath": "/tko:komodo/tko:workspace/admin/conn2",
      "keng__kType": "Connection",
      "keng__hasChildren": false,
      "dv__jndiName": "java:/postgresql-persistent-a8xrt",
      "dv__driverName": "postgresql",
      "dv__type": true,
      "keng__properties": [
        {
          "name": "description",
          "value": "Postgres connection"
        },
        {
          "name": "serviceCatalogSource",
          "value": "postgresql-persistent-a8xrt"
        }
      ],
      "keng___links": [
        {
          "rel": "self",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/connections/conn2"
        },
        {
          "rel": "parent",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/connections"
        },
        {
          "rel": "children",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/search?parent=%2Ftko%3Akomodo%2Ftko%3Aworkspace%2Fadmin%2Fconn2"
        }
      ]
    }
  );

  private static conn3 = Connection.create(
    {
      "keng__baseUri": "http://localhost:4200/vdb-builder/v1/",
      "keng__id": "conn3",
      "keng__dataPath": "/tko:komodo/tko:workspace/admin/conn3",
      "keng__kType": "Connection",
      "keng__hasChildren": false,
      "dv__jndiName": "java:/mysql-persistent-t3irv",
      "dv__driverName": "mysql",
      "dv__type": true,
      "keng__properties": [
        {
          "name": "description",
          "value": "MySQL connection"
        },
        {
          "name": "serviceCatalogSource",
          "value": "mysql-persistent-t3irv"
        }
      ],
      "keng___links": [
        {
          "rel": "self",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/connections/conn3"
        },
        {
          "rel": "parent",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/connections"
        },
        {
          "rel": "children",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/search?parent=%2Ftko%3Akomodo%2Ftko%3Aworkspace%2Fadmin%2Fconn3"
        }
      ]
    }
  );

  // =================================================================
  // ConnectionStatus
  // =================================================================

  private static conn1Status = ConnectionStatus.create(
    {
      "connectionName": TestDataService.conn1.getId(),
      "vdbState": "ACTIVE",
      "vdbName": TestDataService.conn1.getId() + TestDataService.connectionVdbSuffix,
      "schemaState": "ACTIVE",
      "schemaVdbName": TestDataService.conn1.getId() + TestDataService.connectionSchemaVdbSuffix,
      "schemaModelName": TestDataService.conn1.getId() + TestDataService.connectionSchemaModelSuffix,
      "errors": []
    },
  );

  private static conn2Status = ConnectionStatus.create(
    {
      "connectionName": TestDataService.conn2.getId(),
      "vdbState": "ACTIVE",
      "vdbName": TestDataService.conn2.getId() + TestDataService.connectionVdbSuffix,
      "schemaState": "ACTIVE",
      "schemaVdbName": TestDataService.conn2.getId() + TestDataService.connectionSchemaVdbSuffix,
      "schemaModelName": TestDataService.conn2.getId() + TestDataService.connectionSchemaModelSuffix,
      "errors": []
    },
  );

  private static conn3Status = ConnectionStatus.create(
    {
      "connectionName": TestDataService.conn3.getId(),
      "vdbState": "ACTIVE",
      "vdbName": TestDataService.conn3.getId() + TestDataService.connectionVdbSuffix,
      "schemaState": "ACTIVE",
      "schemaVdbName": TestDataService.conn3.getId() + TestDataService.connectionSchemaVdbSuffix,
      "schemaModelName": TestDataService.conn3.getId() + TestDataService.connectionSchemaModelSuffix,
      "errors": []
    },
  );

  // =================================================================
  // Connection Summaries
  // =================================================================

  private static connSummariesConnOnly = [
    TestDataService.createConnectionSummary(TestDataService.conn1, null),
    TestDataService.createConnectionSummary(TestDataService.conn2, null),
    TestDataService.createConnectionSummary(TestDataService.conn3, null)
  ];

  private static connSummariesSchemaStatusOnly = [
    TestDataService.createConnectionSummary(null, TestDataService.conn1Status),
    TestDataService.createConnectionSummary(null, TestDataService.conn2Status),
    TestDataService.createConnectionSummary(null, TestDataService.conn3Status)
  ];

  private static connSummariesBothConnAndStatus = [
    TestDataService.createConnectionSummary(TestDataService.conn1, TestDataService.conn1Status),
    TestDataService.createConnectionSummary(TestDataService.conn2, TestDataService.conn2Status),
    TestDataService.createConnectionSummary(TestDataService.conn3, TestDataService.conn3Status)
  ];

  // =================================================================
  // ConnectionTables for the connections
  // =================================================================
  private static pgConnConnectionTables = [
    TestDataService.createConnectionTable("pgTable1", TestDataService.pgConn, false),
    TestDataService.createConnectionTable("pgTable2", TestDataService.pgConn, false)
  ];

  private static conn1ConnectionTables = [
    TestDataService.createConnectionTable("conn1Table1", TestDataService.conn1, false),
    TestDataService.createConnectionTable("conn1Table2", TestDataService.conn1, false)
  ];

  private static conn2ConnectionTables = [
    TestDataService.createConnectionTable("conn2Table1", TestDataService.conn2, false),
    TestDataService.createConnectionTable("conn2Table2", TestDataService.conn2, false),
    TestDataService.createConnectionTable("conn2Table3", TestDataService.conn2, false),
  ];

  private static conn3ConnectionTables = [
    TestDataService.createConnectionTable("conn3Table1", TestDataService.conn3, false),
    TestDataService.createConnectionTable("conn3Table2", TestDataService.conn3, false),
    TestDataService.createConnectionTable("conn3Table3", TestDataService.conn3, false),
    TestDataService.createConnectionTable("conn3Table4", TestDataService.conn3, false)
  ];

  // =================================================================
  // Result sets
  // =================================================================
  private static employeeJson = {
    "columns": [
      {
        "name": "ssn",
        "label": "ssn",
        "type": "string"
      },
      {
        "name": "firstname",
        "label": "firstname",
        "type": "string"
      },
      {
        "name": "lastname",
        "label": "lastname",
        "type": "string"
      },
      {
        "name": "st_address",
        "label": "st_address",
        "type": "string"
      },
      {
        "name": "apt_number",
        "label": "apt_number",
        "type": "string"
      },
      {
        "name": "city",
        "label": "city",
        "type": "string"
      },
      {
        "name": "state",
        "label": "state",
        "type": "string"
      },
      {
        "name": "zipcode",
        "label": "zipcode",
        "type": "string"
      },
      {
        "name": "phone",
        "label": "phone",
        "type": "string"
      }
    ],
    "rows": [
      {
        "row": [
          "CST01002  ",
          "Joseph",
          "Smith",
          "1234 Main Street",
          "Apartment 56",
          "New York",
          "New York",
          "10174",
          "(646)555-1776"
        ]
      },
      {
        "row": [
          "CST01003  ",
          "Nicholas",
          "Ferguson",
          "202 Palomino Drive",
          "",
          "Pittsburgh",
          "Pennsylvania",
          "15071",
          "(412)555-4327"
        ]
      },
      {
        "row": [
          "CST01004  ",
          "Jane",
          "Aire",
          "15 State Street",
          "",
          "Philadelphia",
          "Pennsylvania",
          "19154",
          "(814)555-6789"
        ]
      },
      {
        "row": [
          "CST01005  ",
          "Charles",
          "Jones",
          "1819 Maple Street",
          "Apartment 17F",
          "Stratford",
          "Connecticut",
          "06614",
          "(203)555-3947"
        ]
      },
      {
        "row": [
          "CST01006  ",
          "Virginia",
          "Jefferson",
          "1710 South 51st Street",
          "Apartment 3245",
          "New York",
          "New York",
          "10175",
          "(718)555-2693"
        ]
      },
      {
        "row": [
          "CST01007  ",
          "Ralph",
          "Bacon",
          "57 Barn Swallow Avenue",
          "",
          "Charlotte",
          "North Carolina",
          "28205",
          "(704)555-4576"
        ]
      },
      {
        "row": [
          "CST01008  ",
          "Bonnie",
          "Dragon",
          "88 Cinderella Lane",
          "",
          "Jacksonville",
          "Florida",
          "32225",
          "(904)555-6514"
        ]
      },
      {
        "row": [
          "CST01009  ",
          "Herbert",
          "Smith",
          "12225 Waterfall Way",
          "Building 100, Suite 9",
          "Portland",
          "Oregon",
          "97220",
          "(971)555-7803"
        ]
      },
      {
        "row": [
          "CST01015  ",
          "Jack",
          "Corby",
          "1 Lone Star Way",
          "",
          "Dallas",
          "Texas",
          "75231",
          "(469)555-8023"
        ]
      },
      {
        "row": [
          "CST01019  ",
          "Robin",
          "Evers",
          "1814 Falcon Avenue",
          "",
          "Atlanta",
          "Georgia",
          "30355",
          "(470)555-4390"
        ]
      },
      {
        "row": [
          "CST01020  ",
          "Lloyd",
          "Abercrombie",
          "1954 Hughes Parkway",
          "",
          "Los Angeles",
          "California",
          "90099",
          "(213)555-2312"
        ]
      },
      {
        "row": [
          "CST01021  ",
          "Scott",
          "Watters",
          "24 Mariner Way",
          "",
          "Seattle",
          "Washington",
          "98124",
          "(206)555-6790"
        ]
      },
      {
        "row": [
          "CST01022  ",
          "Sandra",
          "King",
          "96 Lakefront Parkway",
          "",
          "Minneapolis",
          "Minnesota",
          "55426",
          "(651)555-9017"
        ]
      },
      {
        "row": [
          "CST01027  ",
          "Maryanne",
          "Peters",
          "35 Grand View Circle",
          "Apartment 5F",
          "Cincinnati",
          "Ohio",
          "45232",
          "(513)555-9067"
        ]
      },
      {
        "row": [
          "CST01034  ",
          "Corey",
          "Snyder",
          "1760 Boston Commons Avenue",
          "Suite 543",
          "Boston",
          "Massachusetts",
          "02136 ",
          "(617)555-3546"
        ]
      }
    ]
  };

  // =================================================================
  // Dataservices
  // =================================================================

  private static accountsService = Dataservice.create(
    {
      "keng__baseUri": "http://localhost:4200/vdb-builder/v1/",
      "keng__id": "Accounts",
      "keng__dataPath": "/tko:komodo/tko:workspace/admin/Accounts",
      "keng__kType": "Dataservice",
      "keng__hasChildren": true,
      "tko__description": "A dataservice for accounts.",
      "serviceVdbName": TestDataService.accountsVdb.getName(),
      "serviceVdbVersion": TestDataService.accountsVdb.getVersion(),
      "serviceViewModel": "views",
      "serviceViews": [
        "AcctView1",
        "AcctView2"
      ],
      "serviceViewTables": [
        TestDataService.conn1.getId() + "BtlSource.AcctView1Table1",
        TestDataService.conn1.getId() + "BtlSource.AcctView1Table2",
        TestDataService.conn1.getId() + "BtlSource.AcctView1Table3",
        TestDataService.conn1.getId() + "BtlSource.AcctView2Table1"
      ],
      "connections": 0,
      "drivers": 0,
      "keng___links": [
        {
          "rel": "self",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices/Accounts"
        },
        {
          "rel": "parent",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices"
        },
        {
          "rel": "children",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/search?parent=%2Ftko%3Akomodo%2Ftko%3Aworkspace%2Fadmin%2FAccounts"
        },
        {
          "rel": "vdbs",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices/CustService/Vdbs"
        },
        {
          "rel": "connections",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices/CustService/connections"
        }
      ]
    }
  );

  private static employeesService = Dataservice.create(
    {
      "keng__baseUri": "http://localhost:4200/vdb-builder/v1/",
      "keng__id": "Employees",
      "keng__dataPath": "/tko:komodo/tko:workspace/admin/Employees",
      "keng__kType": "Dataservice",
      "keng__hasChildren": true,
      "tko__description": "A dataservice for employees.",
      "serviceVdbName": TestDataService.employeesVdb.getName(),
      "serviceVdbVersion": TestDataService.employeesVdb.getVersion(),
      "serviceViewModel": "views",
      "serviceViews": [
        "EmpView1",
        "EmpView2",
        "EmpView3",
        "EmpView4"
      ],
      "serviceViewTables": [
        TestDataService.conn2.getId() + "BtlSource.EmpView1Table1",
        TestDataService.conn2.getId() + "BtlSource.EmpView2Table1",
        TestDataService.conn2.getId() + "BtlSource.EmpView2Table2",
        TestDataService.conn2.getId() + "BtlSource.EmpView3Table1",
        TestDataService.conn2.getId() + "BtlSource.EmpView3Table2",
        TestDataService.conn2.getId() + "BtlSource.EmpView3Table3",
        TestDataService.conn2.getId() + "BtlSource.EmpView4Table1",
        TestDataService.conn2.getId() + "BtlSource.EmpView4Table2",
        TestDataService.conn2.getId() + "BtlSource.EmpView4Table3",
        TestDataService.conn2.getId() + "BtlSource.EmpView4Table4"
      ],
      "connections": 0,
      "drivers": 0,
      "keng___links": [
        {
          "rel": "self",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices/Employees"
        },
        {
          "rel": "parent",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices"
        },
        {
          "rel": "children",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/search?parent=%2Ftko%3Akomodo%2Ftko%3Aworkspace%2Fadmin%2FEmployees"
        },
        {
          "rel": "vdbs",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices/CustService/Vdbs"
        },
        {
          "rel": "connections",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices/CustService/connections"
        }
      ]
    }
  );

  private static productsService = Dataservice.create(
    {
      "keng__baseUri": "http://localhost:4200/vdb-builder/v1/",
      "keng__id": "Products",
      "keng__dataPath": "/tko:komodo/tko:workspace/admin/Products",
      "keng__kType": "Dataservice",
      "keng__hasChildren": true,
      "tko__description": "A dataservice for products.",
      "serviceVdbName": TestDataService.productsVdb.getName(),
      "serviceVdbVersion": TestDataService.productsVdb.getVersion(),
      "serviceViewModel": "views",
      "serviceViews": [
        "ProdView1",
        "ProdView2",
        "ProdView3",
        "ProdView4",
        "ProdView5",
        "ProdView6"
      ],
      "serviceViewTables": [
        TestDataService.conn3.getId() + "BtlSource.ProdView1Table1",
        TestDataService.conn3.getId() + "BtlSource.ProdView2Table1",
        TestDataService.conn3.getId() + "BtlSource.ProdView2Table2",
        TestDataService.conn3.getId() + "BtlSource.ProdView3Table1",
        TestDataService.conn3.getId() + "BtlSource.ProdView3Table2",
        TestDataService.conn3.getId() + "BtlSource.ProdView3Table3",
        TestDataService.conn3.getId() + "BtlSource.ProdView4Table1",
        TestDataService.conn3.getId() + "BtlSource.ProdView4Table2",
        TestDataService.conn3.getId() + "BtlSource.ProdView4Table3",
        TestDataService.conn3.getId() + "BtlSource.ProdView4Table4",
        TestDataService.conn3.getId() + "BtlSource.ProdView5Table1",
        TestDataService.conn3.getId() + "BtlSource.ProdView5Table2",
        TestDataService.conn3.getId() + "BtlSource.ProdView5Table3",
        TestDataService.conn3.getId() + "BtlSource.ProdView5Table4",
        TestDataService.conn3.getId() + "BtlSource.ProdView5Table5",
        TestDataService.conn3.getId() + "BtlSource.ProdView6Table1",
        TestDataService.conn3.getId() + "BtlSource.ProdView6Table2",
        TestDataService.conn3.getId() + "BtlSource.ProdView6Table3",
        TestDataService.conn3.getId() + "BtlSource.ProdView6Table4",
        TestDataService.conn3.getId() + "BtlSource.ProdView6Table5",
        TestDataService.conn3.getId() + "BtlSource.ProdView6Table6"
      ],
      "connections": 0,
      "drivers": 0,
      "keng___links": [
        {
          "rel": "self",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices/Products"
        },
        {
          "rel": "parent",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices"
        },
        {
          "rel": "children",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/search?parent=%2Ftko%3Akomodo%2Ftko%3Aworkspace%2Fadmin%2FProducts"
        },
        {
          "rel": "vdbs",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices/CustService/Vdbs"
        },
        {
          "rel": "connections",
          "href": "http://localhost:4200/vdb-builder/v1/workspace/dataservices/CustService/connections"
        }
      ]
    }
  );

  // =================================================================
  // Virtualizations
  // =================================================================

  private static accountsVirtualization = Virtualization.create(
    {
      "vdb_name": TestDataService.accountsVdb.getName(),
      "build_name": TestDataService.accountsVdb.getName() + "-build-1",
      "deployment_name": TestDataService.accountsVdb.getName() + "-deployment-1",
      "build_status": "RUNNING", /* NOTFOUND, BUILDING, DEPLOYING, RUNNING, FAILED, CANCELLED */
      "build_status_message": "Accounts VDB build was successful",
      "namespace": "beetle-studio",
      "last_updated": "2018-03-29T17:02:51.181Z",
      "publishState": PublishState.PUBLISHED
    }
  );

  private static employeesVirtualization = Virtualization.create(
    {
      "vdb_name": TestDataService.employeesVdb.getName(),
      "build_name": TestDataService.employeesVdb.getName() + "-build-1",
      "deployment_name": TestDataService.employeesVdb.getName() + "-deployment-1",
      "build_status": "RUNNING", /* NOTFOUND, BUILDING, DEPLOYING, RUNNING, FAILED, CANCELLED */
      "build_status_message": "Employees VDB build was successful",
      "namespace": "beetle-studio",
      "last_updated": "2018-03-29T17:02:51.181Z",
      "publishState": PublishState.PUBLISHED
    }
  );

  private static productsVirtualization = Virtualization.create(
    {
      "vdb_name": TestDataService.productsVdb.getName(),
      "build_name": TestDataService.productsVdb.getName() + "-build-1",
      "deployment_name": TestDataService.productsVdb.getName() + "-deployment-1",
      "build_status": "RUNNING", /* NOTFOUND, BUILDING, DEPLOYING, RUNNING, FAILED, CANCELLED */
      "build_status_message": "Products VDB build was successful",
      "namespace": "beetle-studio",
      "last_updated": "2018-03-29T17:02:51.181Z",
      "publishState": PublishState.PUBLISHED
    }
  );

  private catalogSources: ServiceCatalogSource[] = [
    TestDataService.pgConnCatalogSource,
    TestDataService.catalogSource1,
    TestDataService.catalogSource2,
    TestDataService.catalogSource3,
    TestDataService.catalogSourceMongo1,
    TestDataService.catalogSourceMongo2];

  private connections: Connection[] = [
    TestDataService.pgConn,
    TestDataService.conn1,
    TestDataService.conn2,
    TestDataService.conn3];

  private dataServices: Dataservice[] = [
    TestDataService.accountsService,
    TestDataService.employeesService,
    TestDataService.productsService
  ];

  private vdbs: Vdb[] = [
    TestDataService.accountsVdb,
    TestDataService.employeesVdb,
    TestDataService.productsVdb
  ];

  private connectionTableMap = new Map<string, ConnectionTable[]>();
  private vdbStatuses: VdbStatus[];
  private virtualizations: Virtualization[];

  /**
   * Create a ServiceCatalogSource using the specified info
   * @param {string} id the id
   * @param {string} name the name
   * @param {string} type the type
   * @param {boolean} bound 'true' if bound
   * @returns {ServiceCatalogSource}
   */
  private static createServiceCatalogSource( id: string, name: string, type: string, bound: boolean ): ServiceCatalogSource {
    const catalogSource = new ServiceCatalogSource();
    catalogSource.setId(id);
    catalogSource.setName(name);
    catalogSource.setType(type);
    catalogSource.setBound(bound);
    return catalogSource;
  }

  /**
   * Create a ConnectionSummary using the specified info
   * @param {Connection} conn the connection
   * @param {ConnectionStatus} status the connection status
   * @returns {ConnectionSummary}
   */
  private static createConnectionSummary( conn: Connection, status: ConnectionStatus ): ConnectionSummary {
    const connectionSummary = new ConnectionSummary();
    connectionSummary.setConnection(conn);
    connectionSummary.setStatus(status);
    return connectionSummary;
  }

  /**
   * Create a ConnectionTable using the specified info
   * @param {string} name the connection table name
   * @param {Connection} connection the connection
   * @param {boolean} selected 'true' if the table is selected
   * @returns {ConnectionSummary}
   */
  private static createConnectionTable( name: string, connection: Connection, selected: boolean ): ConnectionTable {
    const connectionTable = new ConnectionTable();
    connectionTable.setId(name);
    connectionTable.setConnection(connection);
    connectionTable.selected = selected;
    return connectionTable;
  }

  constructor() {
    this.vdbStatuses = TestDataService.vdbStatuses.vdbs.map(( vdbStatus ) => VdbStatus.create( vdbStatus ) );
    this.virtualizations = [
      TestDataService.accountsVirtualization,
      TestDataService.employeesVirtualization,
      TestDataService.productsVirtualization
    ];
  }

  /**
   * Get connection summaries based on supplied parameters
   * @param {boolean} includeConnection include connection in the summary
   * @param {boolean} includeSchemaStatus include schema status in the summary
   * @returns {Connection[]} the array of test connections
   */
  public getConnectionSummaries(includeConnection: boolean, includeSchemaStatus: boolean): ConnectionSummary[] {
    if (includeConnection && includeSchemaStatus) {
      return TestDataService.connSummariesBothConnAndStatus;
    } else if (includeConnection && !includeSchemaStatus) {
      return TestDataService.connSummariesConnOnly;
    } else if (includeSchemaStatus && !includeConnection) {
      return TestDataService.connSummariesSchemaStatusOnly;
    }
  }

  /**
   * @returns {ServiceCatalogSource[]} the array of test Service Catalog datasources
   */
  public getServiceCatalogSources(): ServiceCatalogSource[] {
    return this.catalogSources;
  }

  /**
   * @returns {Dataservice[]} the array of test dataservices
   */
  public getDataservices(): Dataservice[] {
    return this.dataServices;
  }

  /**
   * @returns {QueryResults} test query results
   */
  public getQueryResults(): QueryResults {

    return new QueryResults(TestDataService.employeeJson);
  }

  /**
   * @returns {Map<string, SchemaInfo[]>} the array of test Service Catalog datasources
   */
  public getConnectionTableMap(): Map<string, ConnectionTable[]> {
    const tableMap = new Map<string, ConnectionTable[]>();
    tableMap.set( TestDataService.pgConn.getId(), TestDataService.pgConnConnectionTables );
    tableMap.set( TestDataService.conn1.getId(), TestDataService.conn1ConnectionTables );
    tableMap.set( TestDataService.conn2.getId(), TestDataService.conn2ConnectionTables );
    tableMap.set( TestDataService.conn3.getId(), TestDataService.conn3ConnectionTables );
    return tableMap;
  }

  /**
   * @returns {Vdb[]} the VDB collection
   */
  public getVdbs(): Vdb[] {
    return this.vdbs;
  }

  /**
   * @returns {VdbStatus[]} the VDB status collection
   */
  public getVdbStatuses(): VdbStatus[] {
    return this.vdbStatuses;
  }

  /**
   * @returns {Virtualization[]} the virtualization collection
   */
  public getVirtualizations(): Virtualization[] {
    return this.virtualizations;
  }

}
