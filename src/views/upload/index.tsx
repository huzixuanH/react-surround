import { useRef, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Card, Row, Col, Progress } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { fileUpload } from "@/api/module/upload";
import { AxiosProgressEvent } from "axios";
import SparkMD5 from "spark-md5";

function UploadFormData() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [percent, setPercent] = useState(0);

  // 上传进度
  const onUploadProgress = (e: AxiosProgressEvent) => {
    const { loaded, total } = e;
    setPercent((loaded / total) * 100);
  };

  const handleUpload = () => {
    const formData = new FormData(); // formData
    fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });

    setUploading(true);
    fileUpload(formData, onUploadProgress)
      .then((response) => {
        if (response.code) {
          return;
        }
        setFileList([]);
        message.success("ok");
      })
      .catch(() => {
        message.error("failed");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file, files) => {
      setFileList([...fileList, ...files]);
      setPercent(0);

      // 手动上传，使用handleUpload手动上传
      return false;
    },
    fileList,
    accept: ".png,.jpg,.jpeg",
    multiple: true,
  };

  return (
    <Card title="文件上传-formData" bordered={false}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
      <Progress percent={percent} />
    </Card>
  );
}

function UploadBase64() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // 图片转base64
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        resolve(e.target.result);
      };
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    const base64 = await getBase64(fileList[0]);
    const response = await fileUpload(
      {
        file: encodeURIComponent(base64 as any),
        filename: fileList[0].name,
      },
      null,
      "application/x-www-form-urlencoded"
    );

    if (response.code) {
      return;
    }
    message.success("ok");
    setFileList([]);
    setUploading(false);
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      // 手动上传，使用handleUpload手动上传
      return false;
    },
    fileList,
    accept: ".png,.jpg,.jpeg",
  };

  return (
    <Card title="文件上传-BASE64" bordered={false}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </Card>
  );
}

function UploadSlice() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // 获取文件buffer,hash,name
  const getBuffer = (file): any =>
    new Promise((resolve, _reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const buffer = e.target.result;
        const spark = new SparkMD5.ArrayBuffer();
        spark.append(buffer as ArrayBuffer);
        const hash = spark.end();
        const suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];

        resolve({
          buffer,
          hash,
          suffix,
          filename: `${hash}.${suffix}`,
        });
      };
    });

  // 文件切片【固定大小&固定数量】
  const getChunks = (file, hash, suffix) => {
    const chunks = [];
    let max = 1024 * 1; // 1kb test
    let index = 0;
    let count = Math.ceil(file.size / max);

    // 最多100个chunk
    if (count > 100) {
      max = file.size / 100;
      count = 100;
    }

    while (index < count) {
      index++;
      chunks.push({
        file: file.slice(index * max, index * max),
        filename: `${hash}_${index}.${suffix}`,
      });
    }

    return chunks;
  };

  const indexRef = useRef(0);
  // 单个切片上传完成
  const completed = (count: number) => {
    indexRef.current++;
    // TODO 处理进度条
    if (indexRef.current < count) return;
    // TODO 通知服务器所有切片上传完成
    setUploading(false);
    setFileList([]);
    message.success("ok");
    indexRef.current = 0;
  };

  const handleUpload = async () => {
    setUploading(true);
    // TODO 获取已上传的文件切片信息
    const already = [];
    const { hash, suffix } = await getBuffer(fileList[0]);
    const chunks = getChunks(fileList[0], hash, suffix);

    chunks.forEach((chunk) => {
      if (already.includes(chunk.filename)) {
        completed(chunks.length);
        return; // 切片已经上传过
      }
      const formData = new FormData();
      formData.append("file", chunk.file);
      formData.append("filename", chunk.filename);

      fileUpload(formData)
        .then((response) => {
          if (response.code) {
            return;
          }

          // 切片上传成功
          completed(chunks.length);
        })
        .catch(() => {
          message.error("failed");
        });
    });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      // 手动上传，使用handleUpload手动上传
      return false;
    },
    fileList,
    accept: ".png,.jpg,.jpeg",
  };

  return (
    <Card title="文件上传-切片" bordered={false}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </Card>
  );
}

function FIleUpload() {
  return (
    <div className="content">
      <Row gutter={16}>
        <Col span={8}>
          <UploadFormData />
        </Col>
        <Col span={8}>
          <UploadBase64 />
        </Col>
        <Col span={8}>
          <UploadSlice />
        </Col>
      </Row>
    </div>
  );
}

export default FIleUpload;
