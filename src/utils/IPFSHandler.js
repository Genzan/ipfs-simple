import { create } from 'ipfs-http-client';

export class IPFSHandler {

    static convertToBuffer = async(reader) => {
        console.log("Convirtiendo a Buffer");
        const buffer = await Buffer.from(reader.result);
        console.log("Buffer Respuesta",buffer);
        return buffer;
    };

    static saveFile = async(buffer) => {
        //const auth = 'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');
        /*
        const client = ipfsClient.create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: auth,
            },
        });
        */
        const ipfs = create({ host: '110.238.83.101', port: 5001,protocol: 'http' });
        const hash = await ipfs.add(buffer);
        return hash;
    };

    static viewIPFSFile(hash) {
        const ruta = "https://ipfs.io/ipfs/"+hash;
        return ruta;
    };

}
export default IPFSHandler;