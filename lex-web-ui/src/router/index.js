/*
 Copyright 2017-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import LexWeb from '@/components/LexWeb';
//import TabContainer from '@/components/TabContainer';

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LexWeb',
      component: LexWeb,
    },
    // {
    //   path: '/',
    //   name: 'TabContainer',
    //   component: TabContainer,
    // },
  ],
})

export default router
