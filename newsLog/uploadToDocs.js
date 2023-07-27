const { google } = require("googleapis");
require("dotenv").config();



async function uploadToDocs(content, isTest) {

  // const google_private_key = process.env.google_private_key.replace(/\\n/g, "\n");
  const google_private_key="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkV6mWO4AatPAE\nv8LQcaUl635gSxuPI81g4VGJEZY6wT6hELoR5VCAFb6LZUg/h7clzRzQFjRReDGQ\nmy9i/ogKWbG6ilvz/QAidR/Cmd2i7fxWKuW6Xm2eyaUBqP5BZObmomIpCTbkJz1h\na3Ja/7HgxzUt3R2sDc9M+bhq4mcu0VowSE9varlnN59yPIIH28kSU+V2eZD+y6Jf\npzHa76ZkWRr+Xee/oBrGH+eQmyx8blkAMLqZY3uPzA9xg6JjusvzTY3ZGTjRjoQY\n9lk9xK+kIlsIoxSTC/nKUHSRpR4gIR7ftbW5z8EmJf5e/pkRAhEphgjpS/9mXHj0\n8cthtmUHAgMBAAECggEAcU8S52rlOdt5k1G5EYijY/rE/nGm3lPs0VteA3+HpeZI\n9tH/E2xQkw63PCLpRCVLe+WZm6S5F4hmSBTJ4fzecwxpRmDsGln8nBy0wvNpaTVh\nVzz4PJApI3d6eyVp7fdtIRuJTEW3SGY0bkhMOd3SXfFccULdO4iqys7MdbWdcDwg\n6RTy8d8K6dPmWL2McW3S88z3wtKmGnHXX0P+CWA/5Qz2he6EdhF1DJ/j2tHA3c/x\nSF0qRGJBSwqZXgILzLyi7mX2l9s8fedMkCHT0im7LfWaHNn8er0sTy5IwhnhlYXH\nlDb2BBLGB06RDzL2Q4AOhREO6lidJApz6265Zpj50QKBgQDzAjX+z6os3Uc60sGi\nJ5/SwaqMIGzB24nLRH0qswC9hQTCEC0QeGy3TyIGk+HqIV9AA14M5eA6DOAIPc9i\nkb491oqeT6qs5VRai99j/Tb262YiHnHyK2cRraAC/xoBgFIOfA3WFIJIGk54Q1OV\ncWj8kxNuRtKP3maa5H3smWC23wKBgQDwjLtClQPa2U/uooTy8xXN63Y5jyYsOrU0\nFmAOz/iZBqaCVEnGm9zsYQee06LBj2R3iKedVtdif/yUUs9ysJU5YS8ubyozVwKj\neYBgxg48Brsqu+ulp3bA9GuMwDf40ekEREY8xvLR6SlpZLnzhZpG2zQgGzli9mXK\nHjEYQpre2QKBgE+iyNkhas5bEa24RZaDT7/8kYxsT9fTvztqzW4BzVtOTTnfnTUJ\nke8csrTfH6jfmNxcfiTR7IJ5l617vAu8YVDYjwLEbtVMLjGiJuoYoDuY9xZ1Tbgj\n+xnzAT4aJYaaa8mtY8dlXzCL1m1Y+vo9eT9UX4jDEtvs8UkPWikANo6XAoGBAJW+\nNbAsDVtGHlEiUHrgwfkPE+ie6RdtcHG9YAy4gDvafPryt35wdmWbvV+sxUuTFOqo\nYhc7ARdrLvOyXTs7G5m9mt5gCzgseRMExtr3T9MkKY1fsEDN78oMHYtf+TfmjBTA\n36xj+LKdX88hCfTDfZeQS3GVIPMvCYx5oPxGMhx5AoGAVIZdu+TCwxQg8ORpGyM0\n0V4RhFrY/C/EuP2Jbv6QMl2IEfweSOH873VxX82YX/bjUKmqVHAcswp6JHtadVK6\nqtS9SAvi0/GpPt3E9rSKavhBdOyycRQ4AZVQ3nw35KFbR+3FbqvhIDs2NtXz0FhJ\nqG7u/0w7qq1NeeBz+eSmhsg=\n-----END PRIVATE KEY-----\n"

  console.log(  google_private_key)
  try {
    const jwtClient = new google.auth.JWT(
      process.env.google_client_email,
      null,
      process.env.google_private_key,
      [
        "https://www.googleapis.com/auth/documents",
        "https://www.googleapis.com/auth/drive",
      ],
      null
    );

    await jwtClient.authorize();

    console.log("authorized");

    return await createReport(jwtClient, content, isTest);
  } catch (err) {
    console.error("Error in uploadToDocs:", err);
  }
}

async function createReport(auth, content, isTest) {
  try {
    const drive = google.drive({ version: "v3", auth });
    const docs = google.docs({ version: "v1", auth });

    const folderId = isTest ? "1ujWV7ZDOPKa9fNtO2mPFYokuaUdlQIVI" : "1JfxG2o_ZzsiigDVKsDbKH2sqEB-bl6J7";

    const doc = await drive.files.create({
      requestBody: {
        name: `Weekly report - ${new Date().toLocaleDateString()}`,
        mimeType: "application/vnd.google-apps.document",
        parents: [folderId],
      },
      fields: "id",
      supportsAllDrives: true
    });

    await docs.documents.batchUpdate({
      documentId: doc.data.id,
      requestBody: {
        requests: [
          {
            insertText: {
              location: {
                index: 1,
              },
              text: content,
            },
          },
        ],
      },
    });

    const docMeta = await drive.files.get({
      fileId: doc.data.id,
      fields: "webViewLink",
      supportsAllDrives: true 
    });

    console.log(`Created new document with ID: ${doc.data.id}`);
    console.log(`Document URL: ${docMeta.data.webViewLink}`);

    return docMeta.data.webViewLink;
  } catch (err) {
    console.error("Error in createReport:", err);
  }
}

module.exports = { uploadToDocs };
