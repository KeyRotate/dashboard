import {getConfig} from "../../../../config";
const { grpcApiOrigin } = getConfig();


export const formatMilianUP = () => {
    let cmd = "milian up"
    if (grpcApiOrigin) {
        cmd = "milian up --management-url " + grpcApiOrigin
    }
    return [
        cmd
    ].join('\n')
}

export const formatDockerCommand = () => {
    let cmd = ["docker run --rm -d",
        "   --cap-add=NET_ADMIN",
        "   -e NB_SETUP_KEY=SETUP_KEY",
        "   -v milian-client:/etc/milian"]
    if (grpcApiOrigin) {
        cmd.push("   -e NB_MANAGEMENT_URL="+grpcApiOrigin)
    }
    cmd.push("   keyrotate/milian:latest")
    return cmd.join(' \\\n')
}