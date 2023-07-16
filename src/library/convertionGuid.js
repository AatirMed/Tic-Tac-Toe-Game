import React, { useState } from "react";

const ConvertionGuid = () => {
    const [valueToConvert, setValueToConvert] = useState('')
    const [ConvertValue, setConvertValue] = useState('');

    //MessageError 
    const [mesboolean, setMesboolean] = useState(false);
    const [mes] = useState('Invalid guid!');

    const pattern = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/igm;

    const HandConvert = () => {

        if (valueToConvert.match(pattern) !== null) {
            // error
            setMesboolean(false);

            // convert
            const convert = require('raw-guid-converter').convertString;
            let hex = convert(valueToConvert);

            setConvertValue(hex)
        } else {
            setMesboolean(true);
        }

    }

    return (
        <div>
            <h4>Convertion Guid:</h4>
            <span className="mRyr93">Guid</span>
            <input className="vCon948" type="text" value={valueToConvert} onChange={(e) => setValueToConvert(e.target.value)} />
            <button className="mRyr93" onClick={HandConvert} >Convert</button>
            <button onClick={() => {
                setConvertValue("");
                setValueToConvert("");
                setMesboolean(false);
            }}>Clear</button><br /><br />
            {mesboolean === true ? <mark className="mr837">{mes}</mark> : null}
            {
                ConvertValue.length > 0 && mesboolean === false ? <React.Fragment>
                    <div className='OR89374'>
                        <span className="OR89374TEXT">Oracle RAW(16) format	</span>
                        <span className="OR89374ID" onClick={() => navigator.clipboard.writeText(ConvertValue)}>{ConvertValue}</span>
                    </div>
                    <br />
                    <mark>cliquer sur ID pour le copier</mark>
                </React.Fragment> : null
            }

        </div>
    )
}

export default ConvertionGuid;