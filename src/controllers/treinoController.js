import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const create = async (req, res) => {
    try {
      const { title, description } = req.body;
      
    
      const treino = await prisma.treino.create({
        data: {
          title,
          description,
          userId: req.user.id, 
        },
      });
  
      
      return res.status(201).json({
        message: "Treino criado com sucesso!",
        treino: treino,  
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao criar treino",
        error: error.message,
      });
    }
  };
  
  


export const getAll = async (req, res) => {
  try {
    const userId = req.user.id;  

    const treinos = await prisma.treino.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json(treinos);
  } catch (error) {
    console.error("Error fetching treinos:", error);
    return res.status(500).json({ message: "Error fetching treinos", error: error.message });
  }
};


export const getById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("ID recebido:", id); 
      const treino = await prisma.treino.findUnique({
        where: { id: Number(id) },
      });
  
      
      if (!treino) {
        return res.status(404).json({ message: "Treino não encontrado." });
      }
  
      
      if (treino.userId !== req.user.id) {
        return res.status(403).json({ message: "Acesso negado. Você não tem permissão para acessar esse treino." });
      }
  
      res.status(200).json(treino);
    } catch (error) {
      console.error("Erro:", error); 
      res.status(500).json({ message: "Erro ao buscar treino." });
    }
  };
  


export const update = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      console.log("ID recebido para atualização:", id); 
  
      
      const treino = await prisma.treino.findUnique({
        where: { id: Number(id) },
      });
  
      
      if (!treino) {
        return res.status(404).json({ message: "Treino não encontrado." });
      }
  
      
      if (treino.userId !== req.user.id) {
        return res.status(403).json({ message: "Acesso negado. Você não tem permissão para atualizar esse treino." });
      }
  
      
      const updatedTreino = await prisma.treino.update({
        where: { id: Number(id) },
        data: { title, description },
      });
  
      return res.status(200).json({ message: "Treino atualizado com sucesso!", treino: updatedTreino });
    } catch (error) {
      console.error("Erro:", error); 
      return res.status(500).json({ message: "Erro ao atualizar treino." });
    }
  };
  


export const remove = async (req, res) => {
    try {
      const { id } = req.params;
  
      
      const treino = await prisma.treino.findUnique({ where: { id: Number(id) } });
      if (!treino) {
        return res.status(404).json({ message: "Treino não encontrado." });
      }
  
      
      await prisma.treino.delete({ where: { id: Number(id) } });
  
      return res.status(200).json({ message: "Treino removido com sucesso!" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao remover treino", error: error.message });
    }
  };

  export const patch = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body; 
  
      console.log("ID recebido para atualização parcial:", id); 
  
     
      const treino = await prisma.treino.findUnique({
        where: { id: Number(id) },
      });
  
      
      if (!treino) {
        return res.status(404).json({ message: "Treino não encontrado." });
      }
  
      
      if (treino.userId !== req.user.id) {
        return res.status(403).json({ message: "Acesso negado. Você não tem permissão para atualizar esse treino." });
      }
  
      
      const updatedTreino = await prisma.treino.update({
        where: { id: Number(id) },
        data: {
          title: title || treino.title, 
          description: description || treino.description, 
        },
      });
  
      return res.status(200).json({ message: "Treino atualizado com sucesso!", treino: updatedTreino });
    } catch (error) {
      console.error("Erro:", error); 
      return res.status(500).json({ message: "Erro ao atualizar treino." });
    }
  };
  
  
