import { NavigationItemConfig } from "patternfly-ng";

/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, /
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class DataservicesConstants {

  public static readonly dataservicesExport = "export";
  public static readonly dataservicesPublish = "publish";

  public static readonly dataservicesRootRoute = "virtualizations";
  public static readonly dataservicesRootPath = "/" + DataservicesConstants.dataservicesRootRoute;

  public static readonly dataserviceRestPath = "/dataservice";
  public static readonly dataservicesRestPath = "/dataservices";

  public static readonly addDataserviceRoute = DataservicesConstants.dataservicesRootRoute + "/add-virtualization";
  public static readonly addDataservicePath = DataservicesConstants.dataservicesRootPath + "/add-virtualization";

  public static readonly testDataserviceRoute = DataservicesConstants.dataservicesRootRoute + "/test-virtualization";
  public static readonly testDataservicePath = DataservicesConstants.dataservicesRootPath + "/test-virtualization";

  public static dataserviceNameLabel = "Name";
  public static descriptionLabel = "Description";

  public static readonly dataservicesNavItem: NavigationItemConfig = {
    title: "Virtualizations",
    iconStyleClass: "fa fa-fw fa-table",
    url: DataservicesConstants.dataservicesRootPath
  };

}
