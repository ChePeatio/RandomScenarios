package com.chepeatio;

import java.io.*;
import java.util.*;

/**
 * Created by Che Peatio on 2015/11/25.
 * Edited by Che Peatio on 2015/12/9.
 */
public class GenerateRandomScenario {

    int numOfCopies = 100;
    final String inputPath = "D:\\Codes\\SpecialProjects\\RandomScenarioGeneration\\input\\MultiScenarios";
    final String inputPath1 = "D:\\Codes\\SpecialProjects\\RandomScenarioGeneration\\input\\ScenariosDescription.txt";
    final String outputDire = "D:\\Codes\\SpecialProjects\\RandomScenarioGeneration\\output\\";

    public static void main(String[] args) {

        HashSet<String> set = new HashSet<String>();

        GenerateRandomScenario test = new GenerateRandomScenario();
        List<String[]> description = test.readScenarioDescription(test.inputPath1);
        List<String[]> content = test.readScenarioFromFile(test.inputPath);
        int numOfScenario = content.size();
        int[] specialSeq = new int[numOfScenario];

        Random seed = new Random(System.currentTimeMillis());
        for (int copy=0; copy<test.numOfCopies; copy++) {

            BufferedWriter bw = null;
            try {
                bw = new BufferedWriter(new FileWriter(new File(test.outputDire + copy + ".txt")));
            } catch (IOException e) {
                e.printStackTrace();
            }

            for (String[] aDescription : description) {
                String s;
                do {
                    s = "a";
                    for (int i = 0; i < numOfScenario; i++) {
                        int numOfChoice = content.get(i).length - 1;
                        int rd = seed.nextInt(numOfChoice) + 1;
                        specialSeq[i] = rd;
                        s += rd;
                    }
                } while (set.contains(s));
                set.add(s);

                try {
                    assert bw != null;
                    bw.write(aDescription[0] + "\r\n");
                    bw.write(aDescription[1] + "\r\n");
                    bw.write(aDescription[2] + "\r\n");
                    for (int i = 0; i < numOfScenario; i++) {
                        s = content.get(i)[0] + "：" + content.get(i)[specialSeq[i]];
                        bw.write(s + "\r\n");
                    }
                    bw.write("\r\n\r\n");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            try {
                assert bw != null;
                bw.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 从文件中读取数据，并写入ArrayList
     * @param filePath 文件路径
     * @return List返回值
     */
    public List<String[]> readScenarioFromFile(String filePath) {
        List<String[]> res = new ArrayList<String[]>();

        File file = new File(filePath);
        try {
            BufferedReader br = new BufferedReader(new FileReader(file));
            String line;
            while ((line=br.readLine())!=null) {
                String[] multiParts = line.split("%%");
                if (multiParts.length > 0)
                    res.add(multiParts);
            }
            br.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }

    /**
     * 从文件中读取场景描述数据，并写入ArrayList
     * @param filePath 描述文件路径
     * @return List返回值
     */
    public List<String[]> readScenarioDescription(String filePath) {
        List<String[]> res = new ArrayList<String[]>();
        File file = new File(filePath);
        try {
            BufferedReader br = new BufferedReader(new FileReader(file));
            String line;
            while ((line=br.readLine())!=null) {
                String[] multiParts = line.split("%%");
                if (multiParts.length > 0)
                    res.add(multiParts);
            }
            br.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }
}
