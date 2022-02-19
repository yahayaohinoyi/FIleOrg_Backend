import { HttpException } from '@exceptions/HttpException';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import mimeType from 'mime-types';

class GoogleDriveApiUtil {
  public refreshToken: any;
  public accessToken: any;
  public oauth2client;
  public redirectUri: any;
  public clientSecret: any;
  public clientID: any;
  public drive;

  constructor() {
    this.refreshToken = '1//04yJpe9K_-eNUCgYIARAAGAQSNwF-L9IrtWjqrkhcwBmY8y_CmzrXdm4ndsv73d7vKWCxdlmXp018jkssGbuj8N6yH4m7nX3F_Go';
    this.accessToken =
      'ya29.a0ARrdaM-4jgn1VR3gTXPGMgIulFCZu613yZovrU7aWUDR4Y4CDysKNfieMuRy62ith6MfenEODG7eBKY2AyUZ0gUvjoPdZ5jV2flHfnKqaFTGIuTuyAZj77CZy4Y2K9SHaYgYrQL8i-WmfuENbUC6AJBc7mu8';
    this.redirectUri = 'https://developers.google.com/oauthplayground';
    this.clientSecret = 'x_ipzW4TtGuY__HC99uKado5';
    this.clientID = '785688806738-4p0kv2uc77lb6vf5qg28p34mh390eb7r.apps.googleusercontent.com';

    const oauth2client = new google.auth.OAuth2(this.clientID, this.clientSecret, this.redirectUri);
    oauth2client.setCredentials({
      refresh_token: this.refreshToken,
    });
    this.oauth2client = oauth2client;

    const drive = google.drive({
      version: 'v3',
      auth: oauth2client,
    });

    this.drive = drive;
  }

  public async uploadFile(filePath) {
    try {
      const filePath = path.join(__dirname + '../../..' + '/assets', 'yah.jpg');
      const fileType = mimeType.lookup(String(filePath));
      console.log(fileType);
      const res = await this.drive.files.create({
        requestBody: {
          name: 'yaheezy.jpg',
          mimeType: fileType,
        },
        media: {
          mimeType: 'image/jpg',
          body: fs.createReadStream(filePath),
        },
      });

      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  public async deleteFile(fileId: any) {
    try {
      const res = await this.drive.files.delete({
        fileId,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  public async generatePublicUrl(fileId: any) {
    try {
      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
      const res = await this.drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      return res.data;
    } catch (err) {
      throw new HttpException(400, 'Failed to grant permission');
    }
  }

  public async createEmptyFolder(folderName: string) {
    try {
      const fileMetaData = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      };

      const folderResponse = await this.drive.files.create({
        resource: fileMetaData,
      });
      return folderResponse.data;
    } catch (err) {
      console.log(err);
    }
  }

  public async addFileToFolder(fileId: any, folderId: any) {
    try {
      const file = await this.drive.files.get({
        fileId: fileId,
        fields: 'parents',
      });

      // const previousParents = file.parent.join(',');
      const newFileLocation = await this.drive.files.update({
        fileId: fileId,
        addParents: folderId,
        // removeParents: previousParents,
        fields: 'id, parents',
      });
      console.log(newFileLocation.data);
      return newFileLocation.data;
    } catch (err) {
      throw new HttpException(400, err.message);
    }
  }

  public async removeFileFromFolders(fileId: String, folderId: String) {
    try {
      const file = await this.drive.files.get({
        fileId: fileId,
        fields: 'parents',
      });

      const fileSet = new Set(file.data.parents);
      console.log(fileSet, folderId);
      if (!fileSet.has(folderId)) throw new HttpException(400, 'cannot find file in folder from drive');

      const par = [folderId];
      // const previousParents = file.parent.join(',');
      const response = await this.drive.files.update({
        fileId: fileId,
        removeParents: par,
        fields: 'id, parents',
      });
      return response.data;
    } catch (err) {
      throw new HttpException(400, err.message);
    }
  }
}

export default GoogleDriveApiUtil;
