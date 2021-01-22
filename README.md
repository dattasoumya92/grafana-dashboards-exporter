# grafana-dashboards-exporter
An utility to export all dashboards from a Grafana instance at one go.

## Pre-requisites:
* Node installed.
* Grafana versions 5.0 and above.

## Note
*This will not export dashboards in "General" folder. As per grafana's latest documentation it states that - 
"The General folder (id=0) is special and is not part of the Folder API
 which means that you cannot use this API for retrieving information about the General folder."*
