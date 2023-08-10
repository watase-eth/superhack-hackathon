import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { CERTIFICATE_ADDRESS } from "../../constants/contractAddresses";

export default async function server(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        const { claimerAddress, courseAddress } = JSON.parse(req.body);

        if(!process.env.PRIVATE_KEY){
            throw new Error("No private key found.")
        }

        const sdk = ThirdwebSDK.fromPrivateKey(
            process.env.PRIVATE_KEY,
            "base-goerli",
            {
                secretKey: "OFvHAbeL87x_V0EJxaXGK0zwyCc37dj27sENNl4Cpfd1_Rp-oejR3JzrFGPG1n59dGpzpLkG-W8fCwr0XBzkiw",
            },
        );

        const certificateContract = await sdk.getContract(CERTIFICATE_ADDRESS, "nft-collection");

        const courseContract = await sdk.getContract(courseAddress);

        const courseName = await courseContract.call("courseName");

        const certificateImageIPFS = await courseContract.call("rewardNFTIpfsHash");

        const hasCompletedCourse = await courseContract.call("hasCompletedAllSectionQuizzes", [claimerAddress]);

        if(!hasCompletedCourse){
            throw new Error("User has not completed the course.");
        }

        const payload = {
            to: claimerAddress,
            metadata: {
                name: `${courseName} Certificate`,
                description: `This course was completed by ${claimerAddress}`,
                image: certificateImageIPFS,
            },
            quantity: 1,
        }

        const signedPayload = await certificateContract.erc721.signature.generate(payload);

        res.status(200).json({
            signedPayload: JSON.parse(JSON.stringify(signedPayload))
        })
    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
}