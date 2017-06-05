/**
 * 路由配置
 * @Created by 方雨 on 2017/3/28.
 * @TODO: 路由懒加载
 */
import TopicList from '@/views/topic/list';
import TopicDetail from '@/views/topic/detail';
import TopicEdit from '@/views/topic/edit';
import TopicComment from '@/views/topic/comment';
import TopicCreate from '@/views/topic/create';

import Message from '@/views/message/message';

import User from '@/views/user/index';
import UserMenu from '@/views/user/menu';
import RecentReplies from '@/views/recent/replies';
import RecentTopics from '@/views/recent/topics';
import Collection from '@/views/user/collection';
import Info from '@/views/user/info';
import Set from '@/views/user/set';
import Cnode from '@/views/user/cnode';
import About from '@/views/user/about';
import Login from '@/views/account/login';

import ComponentIndex from '@/views/components/index';
import ComponentNav from '@/views/components/nav';
import ComponentIconFont from '@/views/components/iconFont';
import ComponentBadge from '@/views/components/badge';
import ComponentTextfield from '@/views/components/textField';
import ComponentCheckbox from '@/views/components/checkbox';
import ComponentButtons from '@/views/components/buttons';
import ComponentLoader from '@/views/components/loader';

export default [
  {
    path: '/',
    name: 'TopicList',
    component: TopicList,
  },
  {
    path: '/detail/:id',
    name: 'TopicDetail',
    component: TopicDetail,
  },
  {
    path: '/comment/:id',
    name: 'TopicComment',
    component: TopicComment,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/create',
    component: TopicCreate,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/edit/:id',
    name: 'TopicEdit',
    component: TopicEdit,
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    redirect: '/user/index',  // 重定向
    children: [
      {
        // 主页
        path: 'index',
        component: UserMenu,
      },
      // 最近回复
      {
        path: 'recentreplies',
        component: RecentReplies,
        meta: {
          requireAuth: true,
        },
      },
      // 最新发布
      {
        path: 'recenttopics',
        component: RecentTopics,
        meta: {
          requireAuth: true,
        },
      },
      // 我的收藏
      {
        path: 'collection',
        component: Collection,
        meta: {
          requireAuth: true,
        },
      },
      // 个人信息
      {
        path: 'me',
        name: 'infoMe',
        component: Info,
        meta: {
          requireAuth: true,
        },
      },
      // 用户信息主页
      {
        path: 'info/:name',
        name: 'infoUser',
        component: Info,
      },
      // 设置
      {
        path: 'set',
        component: Set,
      },
      // 关于 CNode
      {
        path: 'cnode',
        component: Cnode,
      },
      // 示例说明
      {
        path: 'about',
        component: About,
      },
    ],
  },
  {
    path: '/component',
    name: 'Component',
    component: ComponentIndex,
    redirect: '/component/nav',  // 重定向
    children: [
      {
        path: 'nav',
        component: ComponentNav,
      },
      {
        path: 'iconfont',
        component: ComponentIconFont,
      },
      {
        path: 'badge',
        component: ComponentBadge,
      },
      {
        path: 'textfield',
        component: ComponentTextfield,
      },
      {
        path: 'checkbox',
        component: ComponentCheckbox,
      },
      {
        path: 'buttons',
        component: ComponentButtons,
      },
      {
        path: 'loader',
        component: ComponentLoader,
      },
    ],
  },
  // 404
  {
    path: '*',
    redirect: '/',  // 重定向
  },
];
