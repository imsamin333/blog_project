import conf from "../conf/conf"
import { Client, Databases, Storage, Permission, Role, ID, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredId, status, userId}){
        try{
            return await this.databases.createDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
                data: { title, content, status, featuredId,userid: userId },
                permissions: [
                    Permission.read(Role.any()),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId))
                ]
            })
        }catch(err){
            console.log("database createpost err:", err)
            return null
        }
    }

    async updatePost(slug, {title, content, featuredId, status}){
        try{
            return await this.databases.updateDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
                data: { title, status, content, featuredId }
            })
        }catch(err){
            console.log("database updatepost err:", err)
            return null
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug
            })
            return true
        }catch(err){
            console.log("database deletepost err:", err)
            return false
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug
            })
        }catch(err){
            console.log("databases getPost err:", err)
            return null
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                queries
            })
        }catch(err){
            console.log("databases getPosts err:", err)
            return null
        }
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
        }catch(err){
            console.log("databases uploadFile err:", err)
            return null
        }
    }

    async deleteFile(fileID){
        try{
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileID
            })
            return true
        }catch(err){
            console.log("databases deletefile err:", err)
            return false
        }
    }

    getFilePreview(fileID){
        if(!fileID) return null
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId: fileID
        }).toString()
    }
}

const service = new Service()
export default service;