import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const Generatoguid = () => {
  const [config, setConfig] = useState({ NbWant: 1, UpperCase: false })
  const [data, setdata] = useState([])

  const changeValueInput = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  }
  const changeValuecheckbox = (e) => {
    setConfig({ ...config, UpperCase: e.target.checked })
  }

  const Generate = () => {
    let listUUID = [];
    for (let i = 0; i < parseInt(config.NbWant); i++) {
      const uuid = uuidv4();
      const convert = require('raw-guid-converter').convertString
      let hex = convert(uuid)
      listUUID.push({ uuid: uuid, hex: hex })
    }
    setdata(listUUID)
  }

  return (
    <div className="App">
      <h3>Online GUID / UUID Generator</h3>

      How many GUIDs do you want (1-1000) : <input type='number' name='NbWant' defaultValue={1} min={1} max={100} className='Nb_want' onChange={changeValueInput} /><br /><br />

      <input type='checkbox' name='UpperCase' defaultChecked={config.UpperCase} onChange={changeValuecheckbox} /> <span>Uppercase </span>
      <button onClick={Generate} className='Generate'>Generate</button><br />
      {
        data.length > 0 ? <React.Fragment>
          <h3>Results : </h3>
          <div className='all_uuid'>
            <div className='one_uuid_hex'>
              <div className='one_uuid'><h4>GUID :</h4></div>
              <div className='one_hex'><h4>Hex (Oracle RAW(16) format) :</h4></div>
            </div>

            {data.map((ele, key) => <div className='one_uuid_hex' key={key}>
              <div className='one_uuid' onClick={() => navigator.clipboard.writeText(ele.uuid)}>
                {config.UpperCase === true ? ele.uuid.toUpperCase() : ele.uuid}
              </div>
              <div className='one_hex' onClick={() => navigator.clipboard.writeText(ele.hex)}>
                {config.UpperCase === true ? ele.hex.toUpperCase() : ele.hex}
              </div>
            </div>)}

          </div>
          <mark>cliquer sur uuid ou hex pour le copier</mark>
        </React.Fragment> : null
      }

    </div>
  );
}
export default Generatoguid;