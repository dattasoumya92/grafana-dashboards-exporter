# Grafana Dashboards Exporter
Grafana Dashboards Exporter - An utility to export all dashboards from a Grafana instance at one go.

## Pre-requisites:
* Node installed.
* Grafana versions 5.0 and above.

## How to run this utility ?
### Grafana Dashboards Exporter
* Install Node in the system. Link to Node: https://nodejs.org/en/download/
* Using Git, clone this repo: `Grafana Dashboards Exporter`
* Go to the exportdashboards.js file and edit following field values:
   ```
   /** PROVIDE INPUT BELOW */
   const apikey = 'Bearer <api_key>'
   const gfhostip = '<your_grafana_host_ip_or_domain_name>'
   const gfport = '<grafana_port>'
   const gfSubPath = '<sub_path_value_from_grafana_ini_properties>'
   const httpsEnabled = false // whether https is enabled on grafana server
   ```
* Open command prompt / shell and type in `node exportdashboards.js` and hit `enter`.
* This utility `Grafana Dashboards Exporter` will create a new directory "dashboards" within the folder from which the command is being executed. 
* Then grafana dashboards will be downloaded in their respective folders within that "dashboards" folder.

## Note
#### Grafana Dashboards Exporter
*This will not export dashboards in "General" folder. As per grafana's latest documentation it states that - 
"The General folder (id=0) is special and is not part of the Folder API
 which means that you cannot use this API for retrieving information about the General folder."*
 link to this documentation: https://grafana.com/docs/grafana/latest/http_api/folder/#a-note-about-the-general-folder
 
