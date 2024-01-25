//Esto se usa como apoyo para  determinar que ambiente usar (testing o dev)

export const getEnvVariables=()=>{

    import.meta.env;
    return {
        ...import.meta.env
    }
}