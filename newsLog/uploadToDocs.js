const { google } = require("googleapis");
require("dotenv").config();

async function uploadToDocs(content) {
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

    return await createReport(jwtClient, content);
  } catch (err) {
    console.error("Error in uploadToDocs:", err);
  }
}

async function createReport(auth, content) {
  try {
    const drive = google.drive({ version: "v3", auth });
    const docs = google.docs({ version: "v1", auth });

    const folderId = "1wo9-vrkRQjORZLkIWwunhPuYeyunuOrK";

    const doc = await drive.files.create({
      requestBody: {
        name: `Weekly report - ${new Date().toLocaleDateString()}`,
        mimeType: "application/vnd.google-apps.document",
        parents: [folderId],
      },
      fields: "id",
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
    });

    console.log(`Created new document with ID: ${doc.data.id}`);
    console.log(`Document URL: ${docMeta.data.webViewLink}`);

    return docMeta.data.webViewLink;
  } catch (err) {
    console.error("Error in createReport:", err);
  }
}

module.exports = { uploadToDocs };
