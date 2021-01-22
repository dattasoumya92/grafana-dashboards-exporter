/** 
This will work with Grafana versions 5.0+ with both https and http protocols.
This will not export dashboards in "General" folder.

As per grafana's latest documentation it states that - 

"The General folder (id=0) is special and is not part of the Folder API
 which means that you cannot use this API for retrieving information about the General folder."

**/


const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')

/** PROVIDE INPUT BELOW */
const apikey = 'Bearer <api_key>'
const gfhostip = '<your_grafana_host_ip_or_domain_name>'
const gfport = '<grafana_port>'
const gfSubPath = '<sub_path_value_from_grafana_ini_properties>'
const httpsEnabled = false // whether https is enabled on grafana server

/** DO NOT CHANGE ANYTHING BELOW */
const options = {
  hostname: gfhostip,
  port: gfport,
  path: gfSubPath+'/api/search',
  method: 'GET',
  headers: {
	'Authorization': apikey 
  }
}
const dir = 'dashboards/'
fs.mkdir(path.join(__dirname, dir), (err) => { 
    if (err) { 
        return console.error(err); 
    } 
    console.log('Directory created successfully!'); 
}); 

if(httpsEnabled){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

caller = httpsEnabled ? https:http

const req = caller.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  let ry = '';
  res.on('data', chunk => {
	ry += chunk
  })
  
  res.on('end', () => {

	JSON.parse(ry).forEach( d => {
		switch(d.type) {
			case 'dash-db':
				console.log("Dashboard: title="+d.title+" , uid="+d.uid)
				var optionstmp = {
				  hostname: gfhostip,
				  port: gfport,
				  path: gfSubPath+'/api/dashboards/uid/'+d.uid,
				  method: 'GET',
				  headers: {
					'Authorization': apikey 
				  }
				}
				reqtmp = caller.request(optionstmp, restmp => {
					console.log(`statusCode: ${restmp.statusCode}`)
					let datatmp = '';
					restmp.on('data', chunk => {
						datatmp += chunk
					})
					restmp.on('end', () => {
						let folder = ''
						if('undefined' !== typeof d.folderTitle){
							folder = d.folderTitle + '/'
							//if(!fs.existsSync(dir+folder)) {
								fs.mkdir(path.join(__dirname+'/'+dir, folder), (err) => { 
									if (err) { 
										//console.error(err); 
									} else {
										console.log('Directory '+folder+' created successfully!'); 
									}
									var filename = folder + d.title+'.json'
									
									json = JSON.parse(datatmp)
									var content = JSON.stringify(json.dashboard, null, 2)
									fs.writeFile(dir+filename, content, err => {
									  if (err) {
										console.error(err)							
									  }
									})
								});
							//}							
						}												
					})
				})
				reqtmp.on('error', error => {
				  console.error(error)
				})
				reqtmp.end()
				break
			default:
				break
    }
	
});
	
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()