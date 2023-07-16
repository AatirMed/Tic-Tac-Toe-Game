import React, { useState, Fragment } from "react";

const ConvertionToOracle = () => {
    const [paragraph, setParagraph] = useState('');
    const [ConvertValue, setConvertValue] = useState('');

    const pattern = /[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/igm;

    const found = paragraph.match(pattern);

    const HandConvert = () => {
        let listConvert = [];

        // duplicate uuid
        const distinctArray = [...new Set(found)];

        // convertion
        // eslint-disable-next-line array-callback-return
        distinctArray.map(ele => {
            const convert = require('raw-guid-converter').convertString;
            let hex = convert(ele);
            listConvert.push({ uuid: ele, hexOracle: hex });
        })

        let updatedParagraph = paragraph;
        listConvert.forEach((ele) => {
            updatedParagraph = updatedParagraph.replace(ele.uuid, ele.hexOracle);
        });
        setConvertValue(updatedParagraph);
    }

    return (
        <div>
            <div>
                <h4>UUID:</h4>
                <textarea rows={12} cols={40} value={paragraph} placeholder='uuid...' onChange={(e) => setParagraph(e.target.value)}></textarea><br />
                <button onClick={HandConvert} style={{ marginRight: "5px" }}>Convert</button>
                <button onClick={() => {
                    setConvertValue("");
                    setParagraph("")
                }}>Clear</button>
            </div>
            {
                ConvertValue.length > 0 ?
                    <Fragment>
                        <h4>Oracle RAW(16) format:</h4>
                        <div onClick={() => navigator.clipboard.writeText(ConvertValue)}>
                            {ConvertValue}
                        </div>
                    </Fragment>

                    : null
            }

        </div>
    )
}

export default ConvertionToOracle;
