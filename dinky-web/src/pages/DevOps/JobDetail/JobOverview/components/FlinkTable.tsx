import StatusTag from '@/components/JobTags/StatusTag';
import { JobProps } from '@/pages/DevOps/JobDetail/data';
import { parseByteStr, parseMilliSecondStr, parseNumStr } from '@/utils/function';
import { l } from '@/utils/intl';
import { ProCard, ProColumns, ProTable } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Text, Link } = Typography;

export type VerticesTableListItem = {
  name: string;
  status: string;
  metrics: any;
  parallelism: number;
  startTime?: string;
  duration?: number;
  endTime?: string;
  tasks: any;
};

/**
 * Renders the JobConfigTab component.
 *
 * @param {JobProps} props - The component props containing the job detail.
 * @returns {JSX.Element} - The rendered JobConfigTab component.
 */
const FlinkTable = (props: JobProps): JSX.Element => {
  const { jobDetail } = props;

  const columns: ProColumns<VerticesTableListItem>[] = [
    {
      title: l('devops.baseinfo.name'),
      dataIndex: 'name',
      ellipsis: true,
      width: 400,
      render: (dom, entity) => {
        return <Link>{entity.name}</Link>;
      }
    },
    {
      title: l('devops.baseinfo.status'),
      dataIndex: 'status',
      sorter: true,
      render: (dom, entity) => {
        return <StatusTag status={entity.status} />;
      }
    },
    {
      title: l('devops.baseinfo.readbytes'),
      render: (dom, entity) => {
        return parseByteStr(entity.metrics['read-bytes']);
      }
    },
    {
      title: l('devops.baseinfo.readrecords'),
      render: (dom, entity) => {
        return parseNumStr(entity.metrics['read-records']);
      }
    },
    {
      title: l('devops.baseinfo.writebytes'),
      render: (dom, entity) => {
        return parseByteStr(entity.metrics['write-bytes']);
      }
    },
    {
      title: l('devops.baseinfo.writerecords'),
      render: (dom, entity) => {
        return parseNumStr(entity.metrics['write-records']);
      }
    },
    {
      title: l('devops.baseinfo.parallelism'),
      sorter: true,
      dataIndex: 'parallelism'
    },
    {
      title: l('global.table.startTime'),
      dataIndex: 'start-time',
      valueType: 'dateTime'
    },
    {
      title: l('global.table.useTime'),
      render: (dom, entity) => {
        return parseMilliSecondStr(entity.duration);
      }
    },
    {
      title: l('global.table.endTime'),
      dataIndex: 'end-time',
      valueType: 'dateTime'
    }
    // {
    //   title: l('devops.baseinfo.tasks'),
    //   render: (dom, entity) => {
    //     return <StatusCounts statusCounts={entity.tasks}/>;
    //   },
    // },
  ];

  return (
    <>
      <ProCard>
        <ProTable
          columns={columns}
          style={{ width: '100%' }}
          dataSource={jobDetail?.jobDataDto?.job?.vertices}
          rowKey='name'
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true
          }}
          toolBarRender={false}
          search={false}
          size='small'
        />
      </ProCard>
      <br />
    </>
  );
};

export default FlinkTable;
