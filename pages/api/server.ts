import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { CERTIFICATE_ADDRESS } from "../../constants/contractAddresses";
import { AwsSecretsManagerWallet } from "@thirdweb-dev/wallets/evm/wallets/aws-secrets-manager";

export default async function server(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        const { claimerAddress, courseAddress } = JSON.parse(req.body);

        const wallet = new AwsSecretsManagerWallet({
            secretId: "arn:aws:secretsmanager:us-east-2:030936188165:secret:private-key-2WQCvf", // ID of the secret value
            secretKeyName: "PRIVATE_KEY", // Name of the secret value
            awsConfig: {
              region: "us-east-2", // Region where your secret is stored
              credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID as string, // Add environment variables to store your AWS credentials
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string, // Add environment variables to store your AWS credentials
              },
            },
          });

        const sdk = await ThirdwebSDK.fromWallet(
            wallet, // Use the retrieved secret key here
            "base-goerli",
            {
                secretKey: "OFvHAbeL87x_V0EJxaXGK0zwyCc37dj27sENNl4Cpfd1_Rp-oejR3JzrFGPG1n59dGpzpLkG-W8fCwr0XBzkiw",
            },
        );

        const certificateContract = await sdk.getContract(CERTIFICATE_ADDRESS, "nft-collection");

        const courseContract = await sdk.getContract(courseAddress);

        const courseName = await (courseContract.call as any)("courseName");

        const certificateImageIPFS = await (courseContract.call as any)("rewardNFTIpfsHash");

        const hasCompletedCourse = await (courseContract.call as any)("hasCompletedAllSectionQuizzes", [claimerAddress]);

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